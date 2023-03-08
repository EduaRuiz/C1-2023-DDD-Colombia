import { AggregateRootException } from '@sofka/exceptions';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotInscriptionInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';

export const GetInscriptionHelper = async (
  inscriptionId: string,
  service?: IInscriptionDomainService,
  event?: GotInscriptionInfoEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (event) {
    if (service) {
      event.response = await service.getInscription(inscriptionId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
