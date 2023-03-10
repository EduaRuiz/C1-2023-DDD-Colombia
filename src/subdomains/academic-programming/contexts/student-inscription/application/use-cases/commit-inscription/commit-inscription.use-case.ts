import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import {
  ICommitInscriptionCommand,
  ICommittedInscriptionResponse,
} from '@contexts/student-inscription/domain/interfaces';
import {
  GroupIdExistQuery,
  StudentIdExistQuery,
  SemesterIdExistQuery,
} from '@contexts/student-inscription/domain/queries';
import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
import { SemesterIdValueObject } from '@contexts/student-inscription/domain/value-objects/semester';
import { StudentIdValueObject } from '@contexts/student-inscription/domain/value-objects/student';
import {
  DateTimeValueObject,
  InscriptionStateValueObject,
} from '@contexts/student-inscription/domain/value-objects/inscription';
import {
  IGroupDomainService,
  IInscriptionDomainService,
  ISemesterDomainService,
  IStudentDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  CommittedInscriptionEventPublisher,
  GotGroupInfoEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';
import { ValueObjectException } from '@sofka/exceptions';

export class CommitInscriptionUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICommitInscriptionCommand, ICommittedInscriptionResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  private readonly groupIdExistQuery: GroupIdExistQuery;
  private readonly semesterIdExistQuery: SemesterIdExistQuery;
  private readonly studentIdExistQuery: StudentIdExistQuery;

  constructor(
    inscription$: IInscriptionDomainService,
    group$: IGroupDomainService,
    student$: IStudentDomainService,
    semester$: ISemesterDomainService,
    committedInscriptionEventPublisher: CommittedInscriptionEventPublisher,
    gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
    groupIdExistQuery: GroupIdExistQuery,
    semesterIdExistQuery: SemesterIdExistQuery,
    studentIdExistQuery: StudentIdExistQuery,
  ) {
    super();
    this.groupIdExistQuery = groupIdExistQuery;
    this.semesterIdExistQuery = semesterIdExistQuery;
    this.studentIdExistQuery = studentIdExistQuery;
    const events = new Map();
    events.set(Topic.CommittedInscription, committedInscriptionEventPublisher);
    events.set(Topic.GotGroupInfo, gotGroupInfoEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      group$,
      events,
      student$,
      semester$,
    });
  }
  async execute(
    command: ICommitInscriptionCommand,
  ): Promise<ICommittedInscriptionResponse> {
    const groups: GroupDomainEntity[] = [];
    command.groupIds.map(async (groupId) => {
      const group = await this.inscriptionAggregateRoot.getGroup(groupId);
      groups.push(group);
    });
    const semesterId = new SemesterIdValueObject(
      command.semesterId,
      this.semesterIdExistQuery,
    );
    const studentId = new StudentIdValueObject(
      command.semesterId,
      this.studentIdExistQuery,
    );
    const dateTime = new DateTimeValueObject();
    const inscriptionState = new InscriptionStateValueObject('active');

    if (semesterId.hasErrors()) this.setErrors(semesterId.getErrors());
    if (studentId.hasErrors()) this.setErrors(studentId.getErrors());
    if (dateTime.hasErrors()) this.setErrors(dateTime.getErrors());
    if (inscriptionState.hasErrors())
      this.setErrors(inscriptionState.getErrors());

    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }

    const student = await this.inscriptionAggregateRoot.getStudent(
      studentId.valueOf(),
    );
    const semester = await this.inscriptionAggregateRoot.getSemester(
      semesterId.valueOf(),
    );

    const inscription = {
      student,
      semester,
      groups,
      inscriptionState,
      dateTime,
    } as InscriptionDomainEntity;
    const data = await this.inscriptionAggregateRoot.commitInscription(
      inscription,
    );
    return { success: true, data };
  }
}
