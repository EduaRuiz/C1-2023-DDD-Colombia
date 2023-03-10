import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { Topic } from '@contexts/student-inscription/domain/events/publishers/enums';
import {
  GroupIdExistQuery,
  InscriptionIdExistQuery,
  SubjectIdExistQuery,
} from '@contexts/student-inscription/domain/queries';
import {
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
  SubjectIdValueObject,
  SubjectNameValueObject,
} from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import { ValueObjectException } from '@sofka/exceptions';
import {
  GroupDomainEntity,
  IGroupDomainEntity,
} from '@contexts/student-inscription/domain/entities';

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
  private readonly inscriptionIdExistQuery: InscriptionIdExistQuery;
  private readonly subjectIdExistQuery: SubjectIdExistQuery;

  constructor(
    private readonly subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
    private readonly group$: IGroupDomainService,
    groupIdExistQuery: GroupIdExistQuery,
    inscriptionIdExistQuery: InscriptionIdExistQuery,
    subjectIdExistQuery: SubjectIdExistQuery,
  ) {
    super();
    this.groupIdExistQuery = groupIdExistQuery;
    this.inscriptionIdExistQuery = inscriptionIdExistQuery;
    this.subjectIdExistQuery = subjectIdExistQuery;
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.SubscribedGroup, subscribedGroupEventPublisher]]),
    });
  }
  async execute(command: IAddGroupCommand): Promise<IAddedGroupResponse> {
    const inscriptionId = new InscriptionIdValueObject(
      command.inscriptionId,
      this.inscriptionIdExistQuery,
    );
    const groupId = new GroupIdValueObject(
      command.groupId,
      this.groupIdExistQuery,
    );
    const classDays = command.classDays;
    const subjectName = new SubjectNameValueObject(command.subjectName);
    const subjectId = new SubjectIdValueObject(
      command.subjectId,
      this.subjectIdExistQuery,
    );
    const professorName = new ProfessorNameValueObject(command.professorName);
    const quoteAvailable = new QuotaAvailableValueObject(
      command.quoteAvailable,
    );
    const groupState = new GroupStateValueObject(command.groupState);

    if (groupId.hasErrors()) this.setErrors(groupId.getErrors());
    if (subjectName.hasErrors()) this.setErrors(subjectName.getErrors());
    if (subjectId.hasErrors()) this.setErrors(subjectId.getErrors());
    if (professorName.hasErrors()) this.setErrors(professorName.getErrors());
    if (quoteAvailable.hasErrors()) this.setErrors(quoteAvailable.getErrors());
    if (groupState.hasErrors()) this.setErrors(groupState.getErrors());

    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }

    const group = new GroupDomainEntity({
      groupId,
      classDays,
      subjectName,
      subjectId,
      professorName,
      quoteAvailable,
      groupState,
    } as IGroupDomainEntity);

    const data = await this.inscriptionAggregateRoot.subscribeGroup(
      inscriptionId.valueOf(),
      group,
    );
    return { success: true, data };
  }
}
