import { ISemesterDomainEntity } from '../../entities/interfaces/semester.domain-entity.interface';
import { IDataForGroup } from './data-for-group.interface';
export interface IDataForOffer {
  offerId: string;
  subject: {
    subjectId: string;
    subjectCode: string;
    subjectName: string;
    subjectContent: string;
  };
  semester: ISemesterDomainEntity;
  group: IDataForGroup[];
  offerState: string;
  dateTime: Date;
}
