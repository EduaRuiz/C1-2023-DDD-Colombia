import { IInscriptionDomainEntity } from '.';
import {
  InstitutionalMailValueObject,
  FullNameValueObject,
  StudentIdValueObject,
} from '@contexts/student-inscription/domain/value-objects/student';

/**
 * Interfaz de la entidad ClassDay contexto StudentInscription
 *
 * @export
 * @class IStudentDomainEntity
 */
export class IStudentDomainEntity {
  studentId?: string | StudentIdValueObject;
  fullName?: string | FullNameValueObject;
  institutionalMail?: string | InstitutionalMailValueObject;
  inscription?: IInscriptionDomainEntity;
}
