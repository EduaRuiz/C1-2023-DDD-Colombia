import { ISubjectIdExist } from '../interfaces';

export interface ISubjectIdExistDomainService {
  exist(subjectId: string): Promise<ISubjectIdExist>;
}
