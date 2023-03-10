import { ClassDayDomainEntity } from '../../entities';

export interface IAddGroupCommand {
  inscriptionId: string;
  groupId: string;
  classDays: ClassDayDomainEntity[];
  subjectName: string;
  subjectId: string;
  professorName: string;
  quoteAvailable: number;
  groupState: string;
}
