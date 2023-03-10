import { ISemesterDomainEntity } from './interfaces';
import {
  PartValueObject,
  SemesterIdValueObject,
  YearValueObject,
} from '../value-objects/semester';
import { InscriptionDomainEntity } from '.';

/**
 * Base de la entidad Semester contexto StudentInscription
 *
 * @export
 * @class SemesterDomainEntity
 * @implements {ISemesterDomainEntity}
 */
export class SemesterDomainEntity implements ISemesterDomainEntity {
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
  inscription?: InscriptionDomainEntity;

  /**
   * Crea una instancia de SemesterDomainEntity.
   * @param {ISemesterDomainEntity} [data] Información relacionada a la entidad
   * @memberof SemesterDomainEntity
   */
  constructor(data: ISemesterDomainEntity) {
    this.semesterId = data.semesterId;
    this.year = data.year;
    this.part = data.part;
    if (data?.inscription) this.inscription = data.inscription;
  }
}
