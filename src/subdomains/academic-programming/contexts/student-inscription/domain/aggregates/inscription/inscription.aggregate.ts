import { EventPublisherBase } from '@sofka/bases';
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
import { Topic } from '../../events/publishers/enums';
import { GetAllClassDaysHelper } from './helpers/get-all-class-days/get-all-class-days.helper';

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
    throw new Error('Method not implemented.');
  }
  getAllClassDays(groupId: string): Promise<ClassDayDomainEntity[]> {
    return GetAllClassDaysHelper(
      groupId,
      this.classDay$,
      this.events.get(Topic.GotClassDays),
    );
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
