import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

export interface IUpdateInscriptionStateResponse {
  success: boolean;
  data: InscriptionDomainEntity;
}
