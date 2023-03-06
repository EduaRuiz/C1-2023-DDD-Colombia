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
import { ChangedInscriptionStateEventPublisher } from '../../events/publishers';

/**
 * Classe Agregado Root Inscription
 *
 * @export
 * @class InscriptionAggregateRoot
 * @implements {IClassDayDomainService}
 * @implements {IGroupDomainService}
 * @implements {IInscriptionDomainService}
 * @implements {ISemesterDomainService}
 * @implements {IStudentDomainService}
 */
export class InscriptionAggregateRoot
  implements
    IClassDayDomainService,
    IGroupDomainService,
    IInscriptionDomainService,
    ISemesterDomainService,
    IStudentDomainService
{
  private readonly classday$?: IClassDayDomainService;
  private readonly group$?: IGroupDomainService;
  private readonly inscription$?: IInscriptionDomainService;
  private readonly semester$?: ISemesterDomainService;
  private readonly student$?: IStudentDomainService;

  private readonly changedInscriptionStateEventPublisher?: ChangedInscriptionStateEventPublisher;

  constructor({
    classday$,
    group$,
    inscription$,
    semester$,
    student$,
    changedInscriptionStateEventPublisher,
  }: {
    classday$?: IClassDayDomainService;
    group$?: IGroupDomainService;
    inscription$?: IInscriptionDomainService;
    semester$?: ISemesterDomainService;
    student$?: IStudentDomainService;
    changedInscriptionStateEventPublisher?: ChangedInscriptionStateEventPublisher;
  }) {
    this.classday$ = classday$;
    this.group$ = group$;
    this.inscription$ = inscription$;
    this.semester$ = semester$;
    this.student$ = student$;
    this.changedInscriptionStateEventPublisher =
      changedInscriptionStateEventPublisher;
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
