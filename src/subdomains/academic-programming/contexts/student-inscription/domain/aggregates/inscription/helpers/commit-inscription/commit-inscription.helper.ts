import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { ChangedInscriptionStateEventPublisher } from '@contexts/student-inscription/domain/events';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

export const CommitInscriptionHelper = async (
  inscription: InscriptionDomainEntity,
  service?: IInscriptionDomainService,
  event?: ChangedInscriptionStateEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.commitInscription(inscription);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
