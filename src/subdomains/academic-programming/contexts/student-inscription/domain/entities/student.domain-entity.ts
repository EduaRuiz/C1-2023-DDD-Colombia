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
  inscription?: InscriptionDomainEntity[];

  /**
   * Crea una instancia de StudentDomainEntity.
   * @param {IStudentDomainEntity} [data] Información relacionada a la entidad
   * @memberof StudentDomainEntity
   */
  constructor(
    studentId: string | StudentIdValueObject,
    fullName: string | FullNameValueObject,
    institutionalMail: string | InstitutionalMailValueObject,
    inscription?: InscriptionDomainEntity[],
  ) {
    this.studentId = studentId;
    this.fullName = fullName;
    this.institutionalMail = institutionalMail;
    if (inscription)
      this.inscription = inscription as InscriptionDomainEntity[];
  }
}
