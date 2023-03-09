import { IInscriptionDomainEntity } from '.';
import {
  PartValueObject,
  SemesterIdValueObject,
  YearValueObject,
} from '@contexts/student-inscription/domain/value-objects/semester';

/**
 * Interfaz de la entidad Semester contexto StudentInscription
 *
 * @export
 * @interface ISemesterDomainEntity
 */
export interface ISemesterDomainEntity {
  /**
   * Id del semestre
   *
   * @type {(string | SemesterIdValueObject)}
   * @memberof SemesterDomainEntity
   */
  semesterId: string | SemesterIdValueObject;
  /**
   * Año relacionado al semestre
   *
   * @type {(Date | YearValueObject)}
   * @memberof SemesterDomainEntity
   */
  year: Date | YearValueObject;
  /**
   * Semestre del año asociado (primera parte o segunda)
   *
   * @type {(number | PartValueObject)} Permite: 1 | 2
   * @memberof SemesterDomainEntity
   */
  part: number | PartValueObject;
  /**
   * Inscripción a la que se asocia el semestre
   *
   * @type {InscriptionDomainEntity}
   * @memberof SemesterDomainEntity
   */
  inscription?: IInscriptionDomainEntity;
}
