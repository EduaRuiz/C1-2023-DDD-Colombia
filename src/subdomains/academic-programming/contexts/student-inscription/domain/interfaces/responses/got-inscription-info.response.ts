import { InscriptionDomainEntity } from '../../entities';

export interface IGotInscriptionInfoResponse {
  success: boolean;
  data: InscriptionDomainEntity | null;
}
