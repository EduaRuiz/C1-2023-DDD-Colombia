import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { IRemoveGroupCommand } from '@contexts/student-inscription/domain/interfaces/commands';
import { IRemovedGroupResponse } from '@contexts/student-inscription/domain/interfaces/responses';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import { EventPublisherBase, ValueObjectErrorHandler } from '@sofka/bases';
import { ValueObjectException } from '@sofka/exceptions';
import { IUseCase } from '@sofka/interfaces';
import {
  Topic,
  UnsubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';

export class RemoveGroupUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IRemoveGroupCommand, IRemovedGroupResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  constructor(
    private readonly group$: IGroupDomainService,
    private readonly unsubscribedGroupEventPublisher: UnsubscribedGroupEventPublisher,
  ) {
    super();
    const events: Map<Topic, EventPublisherBase<any>> = new Map();
    events.set(Topic.UnsubscribedGroup, this.unsubscribedGroupEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$: this.group$,
      events,
    });
  }
  async execute(command: IRemoveGroupCommand): Promise<IRemovedGroupResponse> {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    const groupId = new GroupIdValueObject(command.groupId);
    if (inscriptionId.hasErrors()) this.setErrors(inscriptionId.getErrors());
    if (groupId.hasErrors()) this.setErrors(groupId.getErrors());
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
    const data = await this.inscriptionAggregateRoot.unsubscribeGroup(
      inscriptionId.valueOf(),
      groupId.valueOf(),
    );
    return { success: data ? true : false, data };
  }
}
