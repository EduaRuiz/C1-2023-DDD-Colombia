import { GroupDomainEntity } from '../../entities';

export interface IGotGroupInfoResponse {
  success: boolean;
  data: GroupDomainEntity | null;
}
