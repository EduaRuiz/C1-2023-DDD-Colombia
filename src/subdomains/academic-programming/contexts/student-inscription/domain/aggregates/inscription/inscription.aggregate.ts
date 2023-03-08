import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../../events/publishers/enums';
import {
  ClassDayDomainEntity,
  GroupDomainEntity,
  InscriptionDomainEntity,
  SemesterDomainEntity,
  StudentDomainEntity,
} from '../../entities';
import {
  IClassDayDomainService,
  IGroupDomainService,
  IInscriptionDomainService,
  ISemesterDomainService,
  IStudentDomainService,
} from '../../services';
import {
  GetAllClassDaysHelper,
  GetAllGroupsHelper,
  GetAllInscriptionsHelper,
  GetClassDayHelper,
  GetGroupHelper,
  GetInscriptionHelper,
  SubscribeGroupHelper,
  UnsubscribeGroupHelper,
} from './helpers';

export class InscriptionAggregateRoot
  implements
    IClassDayDomainService,
    IGroupDomainService,
    IInscriptionDomainService,
    ISemesterDomainService,
    IStudentDomainService
{
  private readonly classDay$?: IClassDayDomainService;
  private readonly group$?: IGroupDomainService;
  private readonly inscription$?: IInscriptionDomainService;
  private readonly semester$?: ISemesterDomainService;
  private readonly student$?: IStudentDomainService;
  private readonly events: Map<Topic, EventPublisherBase<any>>;

  constructor({
    classDay$,
    group$,
    inscription$,
    semester$,
    student$,
    events,
  }: {
    classDay$?: IClassDayDomainService;
    group$?: IGroupDomainService;
    inscription$?: IInscriptionDomainService;
    semester$?: ISemesterDomainService;
    student$?: IStudentDomainService;
    events?: Map<Topic, EventPublisherBase<any>>;
  }) {
    this.classDay$ = classDay$;
    this.group$ = group$;
    this.inscription$ = inscription$;
    this.semester$ = semester$;
    this.student$ = student$;
    this.events = events ?? new Map<Topic, any>();
  }

  getClassDay(classDayId: string): Promise<ClassDayDomainEntity> {
    return GetClassDayHelper(
      classDayId,
      this.classDay$,
      this.events.get(Topic.GotClassDayInfo),
    );
  }

  getAllClassDays(groupId: string): Promise<ClassDayDomainEntity[]> {
    return GetAllClassDaysHelper(
      groupId,
      this.classDay$,
      this.events.get(Topic.GotClassDays),
    );
  }

  getGroup(groupId: string): Promise<GroupDomainEntity> {
    return GetGroupHelper(
      groupId,
      this.group$,
      this.events.get(Topic.GotGroupInfo),
    );
  }

  getAllGroups(inscriptionId: string): Promise<GroupDomainEntity[]> {
    return GetAllGroupsHelper(
      inscriptionId,
      this.group$,
      this.events.get(Topic.GotGroups),
    );
  }

  subscribeGroup(group: GroupDomainEntity): Promise<GroupDomainEntity> {
    return SubscribeGroupHelper(group, this.group$, [
      this.events.get(Topic.SubscribedGroup),
      this.events.get(Topic.MatchedClassDayData),
      this.events.get(Topic.MatchedGroupData),
    ]);
  }

  unsubscribeGroup(groupId: string): Promise<GroupDomainEntity> {
    return UnsubscribeGroupHelper(
      groupId,
      this.group$,
      this.events.get(Topic.UnsubscribedGroup),
    );
  }

  getInscription(inscriptionId: string): Promise<InscriptionDomainEntity> {
    return GetInscriptionHelper(
      inscriptionId,
      this.inscription$,
      this.events.get(Topic.GotInscriptionInfo),
    );
  }

  getAllInscriptions(): Promise<InscriptionDomainEntity[]> {
    return GetAllInscriptionsHelper(
      this.inscription$,
      this.events.get(Topic.GotInscriptions),
    );
  }

  changeInscriptionState(
    inscription: InscriptionDomainEntity,
  ): Promise<InscriptionDomainEntity> {
    throw new Error('Method not implemented.');
  }
  commitInscription(
    inscription: InscriptionDomainEntity,
  ): Promise<InscriptionDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getSemester(semesterId: string): Promise<SemesterDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getStudent(studentId: string): Promise<StudentDomainEntity> {
    throw new Error('Method not implemented.');
  }
}
