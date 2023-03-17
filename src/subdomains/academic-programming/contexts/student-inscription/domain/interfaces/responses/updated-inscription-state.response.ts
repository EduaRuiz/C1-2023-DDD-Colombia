import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

export interface IUpdatedInscriptionStateResponse {
  success: boolean;
  data: InscriptionDomainEntity;
}
