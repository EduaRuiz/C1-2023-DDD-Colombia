import { AggregateRootException } from '@sofka/exceptions';
import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotClassDayInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';

export const GetClassDayHelper = async (
  classDayId: string,
  service?: IClassDayDomainService,
  event?: GotClassDayInfoEventPublisher,
): Promise<ClassDayDomainEntity> => {
  if (event) {
    if (service) {
      event.response = await service.getClassDay(classDayId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
