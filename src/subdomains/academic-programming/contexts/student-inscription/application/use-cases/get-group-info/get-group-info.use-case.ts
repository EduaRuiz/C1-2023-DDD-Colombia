import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import {
  IGetGroupInfoCommand,
  IGotGroupInfoResponse,
} from '@contexts/student-inscription/domain/interfaces';
import {
  GotGroupInfoEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';

/**
 * Caso de uso al pedir un grupo dentro del contexto
 *
 * @export
 * @class GetGroupInfoUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetGroupInfoCommand, IGotGroupInfoResponse>}
 */
export class GetGroupInfoUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetGroupInfoCommand, IGotGroupInfoResponse>
{
  /**
   * Instancia del agregado root
   *
   * @private
   * @type {InscriptionAggregateRoot}
   * @memberof GetGroupInfoUseCase
   */
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea una instancia de GetGroupInfoUseCase.
   *
   * @param {GotGroupInfoEventPublisher} gotGroupInfoEventPublisher Evento publicador de la petición
   * @param {IGroupDomainService} group$ Servicio de la entidad Grupo
   * @memberof GetGroupInfoUseCase
   */
  constructor(
    private readonly gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
    private readonly group$: IGroupDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.GotGroupInfo, this.gotGroupInfoEventPublisher]]),
    });
  }

  /**
   * Ejecuta el comando para la consulta
   *
   * @param {IGetGroupInfoCommand} command Tiene la información minima para el proceso
   * @return {Promise<IGotGroupInfoResponse>} Retorna la entidad
   * @memberof GetGroupInfoUseCase
   */
  async execute(command: IGetGroupInfoCommand): Promise<IGotGroupInfoResponse> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const data = await this.inscriptionAggregateRoot.getGroup(
      command.groupId.valueOf(),
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
  private validateCommand(command: IGetGroupInfoCommand): void {
    if (!command.groupId) {
      throw new ValueObjectException(
        `commando invalido groupId debe ser enviado, ${JSON.stringify(
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
    command: IGetGroupInfoCommand,
  ): ValueObjectBase<any>[] {
    const groupId = new GroupIdValueObject(command.groupId);
    return [groupId];
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
