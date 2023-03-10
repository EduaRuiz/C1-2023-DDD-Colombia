import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

export interface ICommittedInscriptionResponse {
  success: boolean;
  data: InscriptionDomainEntity | null;
}
