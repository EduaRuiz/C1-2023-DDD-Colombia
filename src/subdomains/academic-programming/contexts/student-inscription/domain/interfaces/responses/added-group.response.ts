import { GroupDomainEntity } from '../../entities';

export interface IAddedGroupResponse {
  success: boolean;
  data: GroupDomainEntity | null;
}
