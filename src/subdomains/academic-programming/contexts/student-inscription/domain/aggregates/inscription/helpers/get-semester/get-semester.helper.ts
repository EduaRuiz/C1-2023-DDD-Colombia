import { AggregateRootException } from '@sofka/exceptions';
import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotSemesterInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { ISemesterDomainService } from '@contexts/student-inscription/domain/services';

export const GetSemesterHelper = async (
  semesterId: string,
  service?: ISemesterDomainService,
  event?: GotSemesterInfoEventPublisher,
): Promise<SemesterDomainEntity> => {
  if (event) {
    if (service) {
      event.response = await service.getSemester(semesterId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
