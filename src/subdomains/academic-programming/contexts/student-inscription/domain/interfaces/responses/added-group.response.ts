import { GroupDomainEntity } from '../../entities/group.domain-entity';

export interface IAddedGroupResponse {
  success: boolean;
  data: GroupDomainEntity | null;
}
