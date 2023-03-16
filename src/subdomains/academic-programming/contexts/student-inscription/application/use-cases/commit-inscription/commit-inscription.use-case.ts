import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import {
  ICommitInscriptionCommand,
  ICommittedInscriptionResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
import { SemesterIdValueObject } from '@contexts/student-inscription/domain/value-objects/semester';
import { StudentIdValueObject } from '@contexts/student-inscription/domain/value-objects/student';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
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
  GotSemesterInfoEventPublisher,
  GotStudentInfoEventPublisher,
  SubscribedGroupEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';
import { ValueObjectException } from '@sofka/exceptions';
import { IUseCase } from '@sofka/interfaces';

export class CommitInscriptionUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICommitInscriptionCommand, ICommittedInscriptionResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  constructor(
    inscription$: IInscriptionDomainService,
    group$: IGroupDomainService,
    student$: IStudentDomainService,
    semester$: ISemesterDomainService,
    committedInscriptionEventPublisher: CommittedInscriptionEventPublisher,
    gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
    gotStudentInfoEventPublisher: GotStudentInfoEventPublisher,
    gotSemesterInfoEventPublisher: GotSemesterInfoEventPublisher,
    subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
  ) {
    super();
    const events = new Map();
    events.set(Topic.CommittedInscription, committedInscriptionEventPublisher);
    events.set(Topic.GotGroupInfo, gotGroupInfoEventPublisher);
    events.set(Topic.GotStudentInfo, gotStudentInfoEventPublisher);
    events.set(Topic.GotSemesterInfo, gotSemesterInfoEventPublisher);
    events.set(Topic.SubscribedGroup, subscribedGroupEventPublisher);
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
    const data = await this.executeCommand(command);
    return { success: data ? true : false, data };
  }

  private async executeCommand(
    command: ICommitInscriptionCommand,
  ): Promise<InscriptionDomainEntity | null> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const entity = await this.createEntityInscription(command);
    return this.executeAggregateRoot(entity);
  }

  private validateCommand(command: ICommitInscriptionCommand): void {
    if (!command.groupIds || !command.semesterId || !command.studentId) {
      throw new ValueObjectException(
        `commando invalido groupId, semesterId y studentId, deben ser enviados, ${JSON.stringify(
          command,
        )}`,
        this.getErrors(),
      );
    }
  }

  private createValueObjects(
    command: ICommitInscriptionCommand,
  ): ValueObjectBase<any>[] {
    const groupIdsValueObjects: GroupIdValueObject[] = [];
    command.groupIds.map((groupId) => {
      groupIdsValueObjects.push(new GroupIdValueObject(groupId));
    });
    const semesterId = new SemesterIdValueObject(command.semesterId);
    const studentId = new StudentIdValueObject(command.semesterId);
    const dateTime = new DateTimeValueObject();
    const inscriptionState = new InscriptionStateValueObject('active');
    return [
      ...groupIdsValueObjects,
      semesterId,
      studentId,
      dateTime,
      inscriptionState,
    ];
  }

  private validateValueObjects(valueObjects: ValueObjectBase<any>[]) {
    valueObjects.map((valueObject) => {
      if (valueObject.hasErrors()) {
        this.setErrors(valueObject.getErrors());
      }
    });
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
  }

  private async createEntityInscription(
    command: ICommitInscriptionCommand,
  ): Promise<InscriptionDomainEntity> {
    const groups: GroupDomainEntity[] = [];
    command.groupIds.map(async (groupId) => {
      const group = await this.inscriptionAggregateRoot.getGroup(groupId);
      groups.push(group);
    });
    const student = await this.inscriptionAggregateRoot.getStudent(
      command.studentId,
    );
    const semester = await this.inscriptionAggregateRoot.getSemester(
      command.semesterId,
    );
    return new InscriptionDomainEntity(
      student,
      semester,
      groups,
      'active',
      new Date(Date.now()),
    );
  }

  private executeAggregateRoot(
    entity: InscriptionDomainEntity,
  ): Promise<InscriptionDomainEntity | null> {
    return this.inscriptionAggregateRoot.commitInscription(entity);
  }
}
