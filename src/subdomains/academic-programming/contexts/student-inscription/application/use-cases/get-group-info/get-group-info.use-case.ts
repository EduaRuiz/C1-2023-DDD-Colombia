import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { GroupIdExistQuery } from '@contexts/student-inscription/domain/queries';
import { ValueObjectException } from '@sofka/exceptions';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain';
import {
  IGetGroupInfoCommand,
  IGotGroupInfoResponse,
} from '@contexts/student-inscription/domain/interfaces';
import {
  GotGroupInfoEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';

export class GetGroupInfoUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetGroupInfoCommand, IGotGroupInfoResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  private readonly groupIdExistQuery: GroupIdExistQuery;

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
