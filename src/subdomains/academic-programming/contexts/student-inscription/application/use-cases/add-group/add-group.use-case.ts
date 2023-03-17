import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import {
  EventPublisherBase,
  ValueObjectBase,
  ValueObjectErrorHandler,
} from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import {
  GotGroupInfoEventPublisher,
  SubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { Topic } from '@contexts/student-inscription/domain/events/publishers/enums';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import { ValueObjectException } from '@sofka/exceptions';

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
   * @memberof AddGroupUseCase
   */
  constructor(
    private readonly group$: IGroupDomainService,
    private readonly subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
    private readonly gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
  ) {
    super();
    const events: Map<Topic, EventPublisherBase<any>> = new Map();
    events.set(Topic.SubscribedGroup, this.subscribedGroupEventPublisher);
    events.set(Topic.GotGroupInfo, this.gotGroupInfoEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$: this.group$,
      events,
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
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const group = await this.inscriptionAggregateRoot.getGroup(
      command.groupId.valueOf(),
    );
    const data = await this.inscriptionAggregateRoot.subscribeGroup(
      command.inscriptionId.valueOf(),
      group,
    );
    return { success: data ? true : false, data };
  }

  /**
   * Valida si el comando no tiene valores indefinidos
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @memberof CommitInscriptionUseCase
   */
  private validateCommand(command: IAddGroupCommand): void {
    if (!command.groupId || !command.inscriptionId) {
      throw new ValueObjectException(
        `commando invalido groupId e inscriptionId, deben ser enviados, ${JSON.stringify(
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
  private createValueObjects(
    command: IAddGroupCommand,
  ): ValueObjectBase<any>[] {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    const groupId = new GroupIdValueObject(command.groupId);
    return [inscriptionId, groupId];
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
