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
  semesterId?: string | SemesterIdValueObject;
  year?: Date | YearValueObject;
  part?: number | PartValueObject;
  inscription?: InscriptionDomainEntity;

  /**
   * Crea una instancia de SemesterDomainEntity.
   * @param {ISemesterDomainEntity} [data]
   * @memberof SemesterDomainEntity
   */
  constructor(data?: ISemesterDomainEntity) {
    if (data) {
      if (data?.semesterId) this.semesterId = data.semesterId;
      if (data?.year) this.year = data.year;
      if (data?.part) this.part = data.part;
      if (data?.inscription) this.inscription = data.inscription;
    }
  }
}
