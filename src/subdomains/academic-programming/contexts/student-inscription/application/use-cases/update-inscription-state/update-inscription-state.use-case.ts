import {
  IUpdateInscriptionStateCommand,
  IUpdatedInscriptionStateResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { Topic } from '@contexts/student-inscription/domain';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import {
  ChangedInscriptionStateEventPublisher,
  GotInscriptionInfoEventPublisher,
} from '@contexts/student-inscription/domain/events/publishers';
import {
  InscriptionIdValueObject,
  InscriptionStateValueObject,
} from '@contexts/student-inscription/domain/value-objects/inscription';
import { ValueObjectException } from '@sofka/exceptions';

/**
 * Caso de uso que actualiza el estado de una inscripcion
 *
 * @export
 * @class UpdateInscriptionState
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IUpdateInscriptionStateCommand, IUpdatedInscriptionStateResponse>}
 */
export class UpdateInscriptionStateUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IUpdateInscriptionStateCommand, IUpdatedInscriptionStateResponse>
{
  /**
   * Agregado Root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof UpdateInscriptionState
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea una instancia de UpdateInscriptionState.
   *
   * @param {ChangedInscriptionStateEventPublisher} changedInscriptionStateEventPublisher Publicador del caso de uso
   * @param {IInscriptionDomainService} inscription$ Servicio de inscripciones
   * @memberof UpdateInscriptionState
   */
  constructor(
    private readonly changedInscriptionStateEventPublisher: ChangedInscriptionStateEventPublisher,
    private readonly gotInscriptionInfoEventPublisher: GotInscriptionInfoEventPublisher,
    private readonly inscription$: IInscriptionDomainService,
  ) {
    super();
    const events = new Map();
    events.set(
      Topic.ChangedInscriptionState,
      this.changedInscriptionStateEventPublisher,
    );
    events.set(Topic.GotInscriptionInfo, this.gotInscriptionInfoEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      events,
    });
  }
  /**
   * Ejecuta todo el proceso
   *
   * @param {IUpdateInscriptionStateCommand} command Objeto con toda la información
   * @return {Promise<IUpdatedInscriptionStateResponse>} Entidad actualizada
   * @memberof UpdateInscriptionState
   */
  async execute(
    command: IUpdateInscriptionStateCommand,
  ): Promise<IUpdatedInscriptionStateResponse> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const inscription = await this.inscriptionAggregateRoot.getInscription(
      command.inscriptionId,
    );
    if (inscription.inscriptionState === command.inscriptionState) {
      return { success: true, data: inscription };
    }
    const data = await this.inscriptionAggregateRoot.changeInscriptionState(
      command.inscriptionId.valueOf(),
      command.inscriptionState.valueOf(),
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
  private validateCommand(command: IUpdateInscriptionStateCommand): void {
    if (!command.inscriptionId || !command.inscriptionState) {
      throw new ValueObjectException(
        `commando invalido inscriptionState e inscriptionId, deben ser enviados, ${JSON.stringify(
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
    command: IUpdateInscriptionStateCommand,
  ): ValueObjectBase<any>[] {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    const inscriptionState = new InscriptionStateValueObject(
      command.inscriptionState,
    );
    return [inscriptionId, inscriptionState];
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
