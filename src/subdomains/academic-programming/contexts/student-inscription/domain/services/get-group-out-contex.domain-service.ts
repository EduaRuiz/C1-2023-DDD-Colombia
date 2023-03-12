import { IDataForGroup } from '../interfaces/data-out-context/data-for-group.interface';

export interface IGetGroupOutContextDomainService {
  getDataForGroup(groupId: string): Promise<IDataForGroup>;
}
