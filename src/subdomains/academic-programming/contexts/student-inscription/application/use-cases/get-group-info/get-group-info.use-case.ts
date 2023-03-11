import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { GroupIdExistQuery } from '@contexts/student-inscription/domain/queries';
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
   * Query de consulta de la existencia del grupo
   *
   * @private
   * @type {GroupIdExistQuery}
   * @memberof GetGroupInfoUseCase
   */
  private readonly groupIdExistQuery: GroupIdExistQuery;

  /**
   * Crea una instancia de GetGroupInfoUseCase.
   *
   * @param {GotGroupInfoEventPublisher} gotGroupInfoEventPublisher Evento publicador de la petición
   * @param {IGroupDomainService} group$ Servicio de la entidad Grupo
   * @param {GroupIdExistQuery} groupIdExistQuery Query de consulta existencia del grupo
   * @memberof GetGroupInfoUseCase
   */
  constructor(
    private readonly gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
    private readonly group$: IGroupDomainService,
    groupIdExistQuery: GroupIdExistQuery,
  ) {
    super();
    this.groupIdExistQuery = groupIdExistQuery;
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.SubscribedGroup, gotGroupInfoEventPublisher]]),
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
    const groupId = new GroupIdValueObject(
      command.groupId,
      this.groupIdExistQuery,
    );
    if (groupId.hasErrors()) this.setErrors(groupId.getErrors());
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
    const data = await this.inscriptionAggregateRoot.getGroup(
      groupId.valueOf(),
    );
    return { success: true, data };
  }
}
