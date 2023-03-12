import { IClassDayDomainEntity } from '../../entities/interfaces/class-day.domain-entity.interface';
import { IStudentDomainEntity } from '../../entities/interfaces/student.domain-entity.interface';

export interface IDataForGroup {
  groupId: string;
  classDays: IClassDayDomainEntity[];
  student: IStudentDomainEntity;
  professor: {
    professorId: string;
    professorName: string;
    professorCode: string;
    professorMail: string;
  };
  quota: number;
  quotaAvailable: number;
  groupState: string;
  dateTime: Date;
}
