import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import {
  GotInscriptionInfoEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';
import { IGetInscriptionInfoCommand } from '@contexts/student-inscription/domain/interfaces/commands';
import { IGotInscriptionInfoResponse } from '@contexts/student-inscription/domain/interfaces/responses';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';

/**
 * Clase encargada del caso de uso para traer información de una inscripcion
 *
 * @export
 * @class GetInscriptionInfoUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetInscriptionInfoCommand, IGotInscriptionInfoResponse>}
 */
export class GetInscriptionInfoUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetInscriptionInfoCommand, IGotInscriptionInfoResponse>
{
  /**
   * Entidad del agregado root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof GetInscriptionInfoUseCase
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea una instancia de GetInscriptionInfoUseCase.
   * @param {GotInscriptionInfoEventPublisher} gotInscriptionInfoEventPublisher Publicador de obtención de información de una inscripcion
   * @param {IInscriptionDomainService} inscription$ Servicio de inscripciones
   * @memberof GetInscriptionInfoUseCase
   */
  constructor(
    private readonly gotInscriptionInfoEventPublisher: GotInscriptionInfoEventPublisher,
    private readonly inscription$: IInscriptionDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      events: new Map([
        [Topic.GotInscriptionInfo, this.gotInscriptionInfoEventPublisher],
      ]),
    });
  }
  /**
   * Ejecuta todo el proceso
   *
   * @param {IGetInscriptionInfoCommand} command Objeto con toda la información necesaria
   * @return {Promise<IGotInscriptionInfoResponse>} Devuelve la entidad
   * @memberof GetInscriptionInfoUseCase
   */
  async execute(
    command: IGetInscriptionInfoCommand,
  ): Promise<IGotInscriptionInfoResponse> {
    const valueObjects = this.createValueObjects(command);
    this.validateCommand(command);
    this.validateValueObjects(valueObjects);
    const data = await this.inscriptionAggregateRoot.getInscription(
      command.inscriptionId.valueOf(),
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
  private validateCommand(command: IGetInscriptionInfoCommand): void {
    if (!command.inscriptionId) {
      throw new ValueObjectException(
        `commando invalido inscriptionId debe ser enviados, ${JSON.stringify(
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
    command: IGetInscriptionInfoCommand,
  ): ValueObjectBase<any>[] {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    return [inscriptionId];
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
