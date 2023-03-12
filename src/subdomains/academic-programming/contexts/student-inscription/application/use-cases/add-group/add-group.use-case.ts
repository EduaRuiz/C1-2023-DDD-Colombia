import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { Topic } from '@contexts/student-inscription/domain/events/publishers/enums';
import {
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
  SubjectIdValueObject,
  SubjectNameValueObject,
} from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import { ValueObjectException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';

/**
 * Encargado de agregar un nuevo grupo a una inscripción
 *
 * @export
 * @class AddGroupUseCase
 * @extends {ValueObjectErrorHandler}
 */
export class AddGroupUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IAddGroupCommand, IAddedGroupResponse>
{
  /**
   * Instancia del agregado root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof AddGroupUseCase
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea una instancia de AddGroupUseCase.
   *
   * @param {SubscribedGroupEventPublisher} subscribedGroupEventPublisher Evento publicador de la suscripción
   * @param {IGroupDomainService} group$ Servicio que gestiona los grupos
   * @param {GroupIdExistQuery} groupIdExistQuery Query que valida la existencia del grupo a inscribir
   * @param {InscriptionIdExistQuery} inscriptionIdExistQuery Query que valida la existencia de la inscripción a actualizar
   * @param {SubjectIdExistQuery} subjectIdExistQuery Query que valida la existencia de la materia a inscribir
   * @memberof AddGroupUseCase
   */
  constructor(
    private readonly subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
    private readonly group$: IGroupDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.SubscribedGroup, subscribedGroupEventPublisher]]),
    });
  }
  /**
   * Método que ejecuta el proceso del caso de uso
   *
   * @param {IAddGroupCommand} command Conjunto de datos mínimos necesarios para el proceso
   * @return {Promise<IAddedGroupResponse>} Retorna la confirmación de la solicitud
   * @memberof AddGroupUseCase
   */
  async execute(command: IAddGroupCommand): Promise<IAddedGroupResponse> {
    const data = await this.executeCommand(command);
    return { success: data ? true : false, data };
  }

  /**
   * Ejecuta el comando del caso de uso
   *
   * @private
   * @param {IAddGroupCommand} command Comando del caso de uso
   * @return {(Promise<GroupDomainEntity | null>)} Retorna el data que se usara para dar respuesta
   * @memberof AddGroupUseCase
   */
  private async executeCommand(
    command: IAddGroupCommand,
  ): Promise<GroupDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const entity = this.createGroupDomainEntity(valueObjects);
    return await this.executeAggregateRoot(
      valueObjects.inscriptionId.valueOf(),
      entity,
    );
  }

  /**
   * Crea los Objetos de valor correspondientes para ser evaluados
   *
   * @private
   * @param {IAddGroupCommand} command Comando del caso de uso
   * @return {{
   *     inscriptionId: InscriptionIdValueObject;
   *     group: GroupDomainEntity;
   *   }} Objeto con lo información necesaria para la validación de errores
   * @memberof AddGroupUseCase
   */
  private createValueObjects(command: IAddGroupCommand): {
    inscriptionId: InscriptionIdValueObject;
    group: GroupDomainEntity;
  } {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    const groupId = new GroupIdValueObject(command.groupId);
    const classDays = command.classDays;
    const subjectName = new SubjectNameValueObject(command.subjectName);
    const subjectId = new SubjectIdValueObject(command.subjectId);
    const professorName = new ProfessorNameValueObject(command.professorName);
    const quoteAvailable = new QuotaAvailableValueObject(
      command.quoteAvailable,
    );
    const groupState = new GroupStateValueObject(command.groupState);
    return {
      inscriptionId,
      group: {
        groupId,
        classDays,
        subjectName,
        subjectId,
        professorName,
        quoteAvailable,
        groupState,
      },
    };
  }

  /**
   * Valida todos los objetos de valor
   *
   * @private
   * @param {{
   *     inscriptionId: InscriptionIdValueObject;
   *     group: GroupDomainEntity;
   *   }} valueObjects
   * @memberof AddGroupUseCase
   */
  private validateValueObjects(valueObjects: {
    inscriptionId: InscriptionIdValueObject;
    group: GroupDomainEntity;
  }): void {
    const {
      inscriptionId,
      group: {
        groupId,
        subjectName,
        subjectId,
        professorName,
        quoteAvailable,
        groupState,
      },
    } = valueObjects;
    if (inscriptionId.hasErrors()) this.setErrors(inscriptionId.getErrors());
    if (groupId instanceof GroupIdValueObject && groupId.hasErrors())
      this.setErrors(groupId.getErrors());
    if (
      subjectName instanceof SubjectNameValueObject &&
      subjectName.hasErrors()
    )
      this.setErrors(subjectName.getErrors());
    if (subjectId instanceof SubjectIdValueObject && subjectId.hasErrors())
      this.setErrors(subjectId.getErrors());
    if (
      professorName instanceof ProfessorNameValueObject &&
      professorName.hasErrors()
    )
      this.setErrors(professorName.getErrors());
    if (
      quoteAvailable instanceof QuotaAvailableValueObject &&
      quoteAvailable.hasErrors()
    )
      this.setErrors(quoteAvailable.getErrors());
    if (groupState instanceof GroupStateValueObject && groupState.hasErrors())
      this.setErrors(groupState.getErrors());

    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
  }

  /**
   * Crea la entidad que con la que se va a proceder
   *
   * @private
   * @param {{
   *     inscriptionId: InscriptionIdValueObject;
   *     group: GroupDomainEntity;
   *   }} valueObjects Objeto que se usara para generar la petición
   * @return {GroupDomainEntity} Entidad de la petición
   * @memberof AddGroupUseCase
   */
  private createGroupDomainEntity(valueObjects: {
    inscriptionId: InscriptionIdValueObject;
    group: GroupDomainEntity;
  }): GroupDomainEntity {
    const {
      groupId,
      subjectName,
      classDays,
      subjectId,
      professorName,
      quoteAvailable,
      groupState,
    } = valueObjects.group;
    return new GroupDomainEntity({
      groupId: groupId.valueOf(),
      subjectName: subjectName.valueOf(),
      classDays,
      subjectId: subjectId.valueOf(),
      professorName: professorName.valueOf(),
      quoteAvailable: quoteAvailable.valueOf(),
      groupState: groupState.valueOf(),
    });
  }

  /**
   * Ejecuta el método correspondiente al caso de uso del agregado root
   *
   * @private
   * @param {string} inscriptionId Id de la inscripción a actualizar
   * @param {GroupDomainEntity} entity Grupo que se agregara
   * @return {Promise<GroupDomainEntity>} Respuesta de la petición
   * @memberof AddGroupUseCase
   */
  private executeAggregateRoot(
    inscriptionId: string,
    entity: GroupDomainEntity,
  ): Promise<GroupDomainEntity> {
    return this.inscriptionAggregateRoot.subscribeGroup(inscriptionId, entity);
  }
}
