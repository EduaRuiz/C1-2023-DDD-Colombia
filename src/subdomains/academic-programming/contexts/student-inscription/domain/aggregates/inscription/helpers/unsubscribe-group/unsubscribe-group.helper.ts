import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { UnsubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

export const UnsubscribeGroupHelper = async (
  groupId: string,
  service?: IGroupDomainService,
  event?: UnsubscribedGroupEventPublisher,
): Promise<GroupDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.unsubscribeGroup(groupId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
