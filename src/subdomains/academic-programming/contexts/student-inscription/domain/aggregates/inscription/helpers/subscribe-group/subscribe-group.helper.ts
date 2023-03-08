import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import {
  MatchedClassDayDataEventPublisher,
  MatchedGroupDataEventPublisher,
  SubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { AggregateRootException } from '@sofka/exceptions';

export const SubscribeGroupHelper = async (
  group: GroupDomainEntity,
  service?: IGroupDomainService,
  events?: [
    SubscribedGroupEventPublisher?,
    MatchedClassDayDataEventPublisher?,
    MatchedGroupDataEventPublisher?,
  ],
): Promise<GroupDomainEntity> => {
  if (service) {
    if (events) {
      const [
        subscribedGroupEventPublisher,
        matchedClassDayDataEventPublisher,
        matchedGroupDataEventPublisher,
      ] = events;
      if (subscribedGroupEventPublisher) {
        if (matchedClassDayDataEventPublisher) {
          if (matchedGroupDataEventPublisher) {
            matchedGroupDataEventPublisher.publish;
            matchedClassDayDataEventPublisher.publish;
            subscribedGroupEventPublisher.response =
              await service.subscribeGroup(group);
            subscribedGroupEventPublisher.publish;
            return subscribedGroupEventPublisher.response;
          }
          throw new AggregateRootException('');
        }
        throw new AggregateRootException('');
      }
      throw new AggregateRootException('');
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
