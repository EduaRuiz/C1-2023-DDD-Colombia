import { ISubjectIdExist } from '../interfaces';

/**
 * Usado para validar la existencia del id de la materia
 *
 * @export
 * @interface ISubjectIdExistDomainService
 */
export interface ISubjectIdExistDomainService {
  /**
   * Valor que confirma
   *
   * @param {string} subjectId
   * @return {Promise<ISubjectIdExist>} Comprobación de la existencia
   * @memberof ISubjectIdExistDomainService
   */
  exist(subjectId: string): Promise<ISubjectIdExist>;
}
