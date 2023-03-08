import { AggregateRootException } from '@sofka/exceptions';
import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotClassDaysEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';

export const GetAllClassDaysHelper = async (
  groupId: string,
  service?: IClassDayDomainService,
  event?: GotClassDaysEventPublisher,
): Promise<ClassDayDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllClassDays(groupId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
