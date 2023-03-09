import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import {
  IGroupDomainService,
  IInscriptionDomainService,
} from '@contexts/student-inscription/domain/services';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { Topic } from '../../../domain/events/publishers/enums/topic.enum';
import { GotInscriptionInfoEventPublisher } from '../../../domain/events/publishers/got-inscription-info.event-publisher';
import { GroupDomainEntity } from '../../../domain/entities/group.domain-entity';
import {
  GroupIdExistQuery,
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
} from '@contexts/student-inscription/domain';

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
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  private readonly groupIdExistQuery: GroupIdExistQuery;
  constructor(
    private readonly subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
    private readonly gotInscriptionInfoEventPublisher: GotInscriptionInfoEventPublisher,
    private readonly group$: IGroupDomainService,
    private readonly inscription$: IInscriptionDomainService,
    groupIdExistQuery: GroupIdExistQuery,
  ) {
    super();
    this.groupIdExistQuery = groupIdExistQuery;
    const events = new Map();
    events.set(Topic.SubscribedGroup, subscribedGroupEventPublisher);
    events.set(Topic.GotInscriptionInfo, gotInscriptionInfoEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events,
    });
  }
  execute(command: IAddGroupCommand): Promise<IAddedGroupResponse> {
    const inscription = this.inscriptionAggregateRoot.getInscription(
      command.inscriptionId,
    );
    inscription.then((data) => data.groups);
    const commandValidations = {
      inscriptionId: command.inscriptionId,
      groupId: new GroupIdValueObject(command.groupId, this.groupIdExistQuery),
      classDays: command.classDays,
      subjectName: new GroupStateValueObject(command.subjectName),
      professorName: new ProfessorNameValueObject(command.professorName),
      quoteAvailable: new QuotaAvailableValueObject(command.quoteAvailable),
      groupState: new GroupStateValueObject(command.groupState),
    };

    for (const atribute in commandValidations) {
    }
    this.inscriptionAggregateRoot.subscribeGroup();
  }

  private logic(): boolean{

  }
}
