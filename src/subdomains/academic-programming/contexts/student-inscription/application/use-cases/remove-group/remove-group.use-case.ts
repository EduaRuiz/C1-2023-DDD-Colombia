import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { IRemoveGroupCommand } from '@contexts/student-inscription/domain/interfaces/commands';
import { IRemovedGroupResponse } from '@contexts/student-inscription/domain/interfaces/responses';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import {
  EventPublisherBase,
  ValueObjectBase,
  ValueObjectErrorHandler,
} from '@sofka/bases';
import { ValueObjectException } from '@sofka/exceptions';
import { IUseCase } from '@sofka/interfaces';
import {
  Topic,
  UnsubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';

/**
 * Caso de uso encargado de retirar un grupo de una inscripcion
 *
 * @export
 * @class RemoveGroupUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IRemoveGroupCommand, IRemovedGroupResponse>}
 */
export class RemoveGroupUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IRemoveGroupCommand, IRemovedGroupResponse>
{
  /**
   * Agregado root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof RemoveGroupUseCase
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea un instancia de RemoveGroupUseCase.
   *
   * @param {IGroupDomainService} group$ Servicio de los grupos
   * @param {UnsubscribedGroupEventPublisher} unsubscribedGroupEventPublisher Publicador para retiro de grupos
   * @memberof RemoveGroupUseCase
   */
  constructor(
    private readonly group$: IGroupDomainService,
    private readonly unsubscribedGroupEventPublisher: UnsubscribedGroupEventPublisher,
  ) {
    super();
    const events: Map<Topic, EventPublisherBase<any>> = new Map();
    events.set(Topic.UnsubscribedGroup, this.unsubscribedGroupEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$: this.group$,
      events,
    });
  }
  /**
   * Ejecuta todo el proceso
   *
   * @param {IRemoveGroupCommand} command Objeto con toda la información necesaria
   * @return {Promise<IRemovedGroupResponse>} Entidad actualizada
   * @memberof RemoveGroupUseCase
   */
  async execute(command: IRemoveGroupCommand): Promise<IRemovedGroupResponse> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const data = await this.inscriptionAggregateRoot.unsubscribeGroup(
      command.inscriptionId.valueOf(),
      command.groupId.valueOf(),
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
  private validateCommand(command: IRemoveGroupCommand): void {
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
    command: IRemoveGroupCommand,
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
