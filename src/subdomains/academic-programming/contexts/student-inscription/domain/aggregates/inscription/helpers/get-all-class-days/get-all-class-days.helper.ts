import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';
import { AggregateRootException } from '@sofka/exceptions';
import { GotClassDaysEventPublisher } from '../../../../events/publishers';
import { ClassDayDomainEntity } from '../../../../entities';

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
