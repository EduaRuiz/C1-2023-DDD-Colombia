import { GroupDomainEntity } from '../../entities';

export interface IRemovedGroupResponse {
  success: boolean;
  data: GroupDomainEntity | null;
}
