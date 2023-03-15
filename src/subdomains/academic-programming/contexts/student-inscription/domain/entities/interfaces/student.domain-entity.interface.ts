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
  /**
   * Id del estudiante
   *
   * @type {(string | StudentIdValueObject)} UUID v4
   * @memberof StudentDomainEntity
   */
  studentId: string | StudentIdValueObject;
  /**
   * Nombre completo del estudiante
   *
   * @type {(string | FullNameValueObject)}
   * @memberof StudentDomainEntity
   */
  fullName: string | FullNameValueObject;
  /**
   * Correo institucional del estudiante
   *
   * @type {(string | InstitutionalMailValueObject)}
   * @memberof StudentDomainEntity
   */
  institutionalMail: string | InstitutionalMailValueObject;
  /**
   * Inscripción a la que se asocia el estudiante
   *
   * @type {InscriptionDomainEntity[]}
   * @memberof StudentDomainEntity
   */
  inscription?: IInscriptionDomainEntity[];
}
