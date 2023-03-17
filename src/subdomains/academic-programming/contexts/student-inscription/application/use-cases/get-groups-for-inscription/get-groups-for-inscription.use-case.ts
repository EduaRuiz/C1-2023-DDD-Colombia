import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import {
  IGroupDomainService,
  ISubjectIdExistDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  GroupStateValueObject,
  SubjectIdValueObject,
} from '@contexts/student-inscription/domain/value-objects/group';
import { IGetGroupsForInscriptionCommand } from '../../../domain/interfaces/commands/get-groups-for-inscription.command';
import { IGotGroupsForInscriptionResponse } from '../../../domain/interfaces/responses/got-groups-for-inscription.response';
import {
  GotGroupsEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';

/**
 * Clase encargada del caso de uso para retornar los grupos según comando
 *
 * @export
 * @class GetGroupsForInscriptionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetGroupsForInscriptionCommand, IGotGroupsForInscriptionResponse>}
 */
export class GetGroupsForInscriptionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IGetGroupsForInscriptionCommand, IGotGroupsForInscriptionResponse>
{
  /**
   * Agregado root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof GetGroupsForInscriptionUseCase
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea una instancia de GetGroupsForInscriptionUseCase.
   * @param {GotGroupsEventPublisher} gotGroupsEventPublisher Publicador al buscar grupos
   * @param {IGroupDomainService} group$ Servicio de grupos
   * @memberof GetGroupsForInscriptionUseCase
   */
  constructor(
    private readonly gotGroupsEventPublisher: GotGroupsEventPublisher,
    private readonly group$: IGroupDomainService,
    private readonly subjectIdExistDomainService: ISubjectIdExistDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.GotGroups, this.gotGroupsEventPublisher]]),
    });
  }

  /**
   * Ejecuta el comando para la consulta
   *
   * @param {IGetGroupInfoCommand} command Tiene la información minima para el proceso
   * @return {Promise<IGotGroupInfoResponse>} Retorna la entidad
   * @memberof GetGroupInfoUseCase
   */
  async execute(
    command: IGetGroupsForInscriptionCommand,
  ): Promise<IGotGroupsForInscriptionResponse> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(await valueObjects);
    const data = await this.inscriptionAggregateRoot.getAllGroups(
      command.subjectId.valueOf(),
      command.groupState.valueOf(),
    );
    return { success: true, data };
  }

  /**
   * Valida si el comando no tiene valores indefinidos
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @memberof CommitInscriptionUseCase
   */
  private validateCommand(command: IGetGroupsForInscriptionCommand): void {
    if (!command.groupState || !command.subjectId) {
      throw new ValueObjectException(
        `commando invalido groupState y subjectId, deben ser enviados, ${JSON.stringify(
          command,
        )}`,
        this.getErrors(),
      );
    }
  }

  /**
   * Crea los Objetos de valor que se van a evaluar
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @return {ValueObjectBase<any>[]} Retorna Array de objetos de valor
   * @memberof CommitInscriptionUseCase
   */
  private async createValueObjects(
    command: IGetGroupsForInscriptionCommand,
  ): Promise<ValueObjectBase<any>[]> {
    const groupState = new GroupStateValueObject(command.groupState);
    const subjectId = new SubjectIdValueObject(command.subjectId);
    const exist = await this.subjectIdExistDomainService.exist(
      command.subjectId,
    );
    if (!exist) {
      throw new ValueObjectException('El SubjectId suministrado no existe', []);
    }
    return [subjectId, groupState];
  }

  /**
   * Valida todos los objetos de valor
   *
   * @private
   * @param {ValueObjectBase<any>[]} valueObjects Lista de objetos de valor
   * @memberof CommitInscriptionUseCase
   */
  private validateValueObjects(valueObjects: ValueObjectBase<any>[]) {
    for (const valueObject of valueObjects) {
      if (valueObject.hasErrors()) {
        this.setErrors(valueObject.getErrors());
      }
    }
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
  }
}
