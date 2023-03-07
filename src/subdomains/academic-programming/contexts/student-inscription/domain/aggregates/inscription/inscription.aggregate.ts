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
  ChangedInscriptionStateEventPublisher,
  CommittedInscriptionEventPublisher,
  GotClassDayEventPublisher,
  GotGroupInfoEventPublisher,
  GotGroupsEventPublisher,
  GotInscriptionInfoEventPublisher,
  GotInscriptionsEventPublisher,
  GotSemesterInfoEventPublisher,
  GotStudentInfoEventPublisher,
  MatchedClassDayDataEventPublisher,
  MatchedGroupDataEventPublisher,
  MatchedSemesterDataEventPublisher,
  MatchedStudentDataEventPublisher,
  SubscribedGroupEventPublisher,
  UnsubscribedGroupEventPublisher,
} from '../../events/publishers';

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

  private readonly changedInscriptionStateEventPublisher?: ChangedInscriptionStateEventPublisher;
  private readonly committedInscriptionEventPublisher?: CommittedInscriptionEventPublisher;
  private readonly gotClassDayEventPublisher?: GotClassDayEventPublisher;
  private readonly gotGroupInfoEventPublisher?: GotGroupInfoEventPublisher;
  private readonly gotGroupsEventPublisher?: GotGroupsEventPublisher;
  private readonly gotInscriptionInfoEventPublisher?: GotInscriptionInfoEventPublisher;
  private readonly gotInscriptionsEventPublisher?: GotInscriptionsEventPublisher;
  private readonly gotSemesterInfoEventPublisher?: GotSemesterInfoEventPublisher;
  private readonly gotStudentInfoEventPublisher?: GotStudentInfoEventPublisher;
  private readonly matchedClassDayDataEventPublisher?: MatchedClassDayDataEventPublisher;
  private readonly matchedGroupDataEventPublisher?: MatchedGroupDataEventPublisher;
  private readonly matchedSemesterDataEventPublisher?: MatchedSemesterDataEventPublisher;
  private readonly matchedStudentDataEventPublisher?: MatchedStudentDataEventPublisher;
  private readonly subscribedGroupEventPublisher?: SubscribedGroupEventPublisher;
  private readonly unsubscribedGroupEventPublisher?: UnsubscribedGroupEventPublisher;

  constructor({
    classDay$,
    group$,
    inscription$,
    semester$,
    student$,
    changedInscriptionStateEventPublisher,
    committedInscriptionEventPublisher,
    gotClassDayEventPublisher,
    gotGroupInfoEventPublisher,
    gotGroupsEventPublisher,
    gotInscriptionInfoEventPublisher,
    gotInscriptionsEventPublisher,
    gotSemesterInfoEventPublisher,
    gotStudentInfoEventPublisher,
    matchedClassDayDataEventPublisher,
    matchedGroupDataEventPublisher,
    matchedSemesterDataEventPublisher,
    matchedStudentDataEventPublisher,
    subscribedGroupEventPublisher,
    unsubscribedGroupEventPublisher,
  }: {
    classDay$?: IClassDayDomainService;
    group$?: IGroupDomainService;
    inscription$?: IInscriptionDomainService;
    semester$?: ISemesterDomainService;
    student$?: IStudentDomainService;
    changedInscriptionStateEventPublisher?: ChangedInscriptionStateEventPublisher;
    committedInscriptionEventPublisher?: CommittedInscriptionEventPublisher;
    gotClassDayEventPublisher?: GotClassDayEventPublisher;
    gotGroupInfoEventPublisher?: GotGroupInfoEventPublisher;
    gotGroupsEventPublisher?: GotGroupsEventPublisher;
    gotInscriptionInfoEventPublisher?: GotInscriptionInfoEventPublisher;
    gotInscriptionsEventPublisher?: GotInscriptionsEventPublisher;
    gotSemesterInfoEventPublisher?: GotSemesterInfoEventPublisher;
    gotStudentInfoEventPublisher?: GotStudentInfoEventPublisher;
    matchedClassDayDataEventPublisher?: MatchedClassDayDataEventPublisher;
    matchedGroupDataEventPublisher?: MatchedGroupDataEventPublisher;
    matchedSemesterDataEventPublisher?: MatchedSemesterDataEventPublisher;
    matchedStudentDataEventPublisher?: MatchedStudentDataEventPublisher;
    subscribedGroupEventPublisher?: SubscribedGroupEventPublisher;
    unsubscribedGroupEventPublisher?: UnsubscribedGroupEventPublisher;
  }) {
    this.classDay$ = classDay$;
    this.group$ = group$;
    this.inscription$ = inscription$;
    this.semester$ = semester$;
    this.student$ = student$;
    this.changedInscriptionStateEventPublisher =
      changedInscriptionStateEventPublisher;
    this.committedInscriptionEventPublisher =
      committedInscriptionEventPublisher;
    this.gotClassDayEventPublisher = gotClassDayEventPublisher;
    this.gotGroupInfoEventPublisher = gotGroupInfoEventPublisher;
    this.gotGroupsEventPublisher = gotGroupsEventPublisher;
    this.gotInscriptionInfoEventPublisher = gotInscriptionInfoEventPublisher;
    this.gotInscriptionsEventPublisher = gotInscriptionsEventPublisher;
    this.gotSemesterInfoEventPublisher = gotSemesterInfoEventPublisher;
    this.gotStudentInfoEventPublisher = gotStudentInfoEventPublisher;
    this.matchedClassDayDataEventPublisher = matchedClassDayDataEventPublisher;
    this.matchedGroupDataEventPublisher = matchedGroupDataEventPublisher;
    this.matchedSemesterDataEventPublisher = matchedSemesterDataEventPublisher;
    this.matchedStudentDataEventPublisher = matchedStudentDataEventPublisher;
    this.subscribedGroupEventPublisher = subscribedGroupEventPublisher;
    this.unsubscribedGroupEventPublisher = unsubscribedGroupEventPublisher;
  }

  getClassDay(classDayId: string): Promise<ClassDayDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getAllClassDay(): Promise<ClassDayDomainEntity[]> {
    throw new Error('Method not implemented.');
  }
  getGroup(groupId: string): Promise<GroupDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getAllGroups(): Promise<GroupDomainEntity[]> {
    throw new Error('Method not implemented.');
  }
  subscribeGroup(groupId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  unsubscribeGroup(groupId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getInscription(inscription: string): Promise<InscriptionDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getAllInscriptions(): Promise<InscriptionDomainEntity[]> {
    throw new Error('Method not implemented.');
  }
  changeInscriptionState(
    inscription: InscriptionDomainEntity,
  ): Promise<boolean> {
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
