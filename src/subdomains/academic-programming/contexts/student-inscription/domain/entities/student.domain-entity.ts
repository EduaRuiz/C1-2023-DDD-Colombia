import { IStudentDomainEntity } from './interfaces';
import {
  InstitutionalMailValueObject,
  FullNameValueObject,
  StudentIdValueObject,
} from '../value-objects/student';
import { InscriptionDomainEntity } from '.';

/**
 * Base de la entidad Student contexto StudentInscription
 *
 * @export
 * @class StudentDomainEntity
 * @implements {IStudentDomainEntity}
 */
export class StudentDomainEntity implements IStudentDomainEntity {
  studentId?: string | StudentIdValueObject;
  fullName?: string | FullNameValueObject;
  institutionalMail?: string | InstitutionalMailValueObject;
  inscription?: InscriptionDomainEntity;

  /**
   * Crea una instancia de StudentDomainEntity.
   * @param {IStudentDomainEntity} [data]
   * @memberof StudentDomainEntity
   */
  constructor(data?: IStudentDomainEntity) {
    if (data) {
      if (data?.studentId) this.studentId = data.studentId;
      if (data?.fullName) this.fullName = data.fullName;
      if (data?.institutionalMail) {
        this.institutionalMail = data.institutionalMail;
      }
      if (data?.inscription) this.inscription = data.inscription;
    }
  }
}
