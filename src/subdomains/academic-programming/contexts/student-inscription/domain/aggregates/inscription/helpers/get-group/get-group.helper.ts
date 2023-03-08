import { AggregateRootException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotGroupInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';

export const GetGroupHelper = async (
  groupId: string,
  service?: IGroupDomainService,
  event?: GotGroupInfoEventPublisher,
): Promise<GroupDomainEntity> => {
  if (event) {
    if (service) {
      event.response = await service.getGroup(groupId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
