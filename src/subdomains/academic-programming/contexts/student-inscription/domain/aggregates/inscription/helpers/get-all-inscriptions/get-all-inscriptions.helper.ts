import { AggregateRootException } from '@sofka/exceptions';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotInscriptionsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';

export const GetAllInscriptionsHelper = async (
  service?: IInscriptionDomainService,
  event?: GotInscriptionsEventPublisher,
): Promise<InscriptionDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllInscriptions();
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
