import { AggregateRootException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotGroupsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';

export const GetAllGroupsHelper = async (
  inscriptionId: string,
  service?: IGroupDomainService,
  event?: GotGroupsEventPublisher,
): Promise<GroupDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllGroups(inscriptionId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
