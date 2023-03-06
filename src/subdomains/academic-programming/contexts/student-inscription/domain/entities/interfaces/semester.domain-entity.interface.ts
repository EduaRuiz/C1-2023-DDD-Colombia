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
  semesterId?: string | SemesterIdValueObject;
  year?: Date | YearValueObject;
  part?: number | PartValueObject;
  inscription?: IInscriptionDomainEntity;
}
