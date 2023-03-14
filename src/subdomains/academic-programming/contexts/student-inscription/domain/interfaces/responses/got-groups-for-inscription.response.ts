import { GroupDomainEntity } from '../../entities';

export interface IGotGroupsForInscriptionResponse {
  success: boolean;
  data: GroupDomainEntity[] | null;
}
