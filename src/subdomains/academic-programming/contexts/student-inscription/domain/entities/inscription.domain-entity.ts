import { IInscriptionDomainEntity } from './interfaces';
import {
  DateTimeValueObject,
  InscriptionIdValueObject,
  InscriptionStateValueObject,
} from '../value-objects/inscription';
import {
  GroupDomainEntity,
  SemesterDomainEntity,
  StudentDomainEntity,
} from '.';

/**
 * Base de la entidad Inscription contexto StudentInscription
 *
 * @export
 * @class InscriptionDomainEntity
 * @implements {IInscriptionDomainEntity}
 */
export class InscriptionDomainEntity implements IInscriptionDomainEntity {
  inscriptionId?: string | InscriptionIdValueObject;
  student?: StudentDomainEntity;
  semester?: SemesterDomainEntity;
  groups?: GroupDomainEntity[];
  inscriptionState?: string | InscriptionStateValueObject;
  dateTime?: Date | DateTimeValueObject;

  /**
   * Crea una instancia de InscriptionDomainEntity.
   * @param {IInscriptionDomainEntity} [data]
   * @memberof InscriptionDomainEntity
   */
  constructor(data?: IInscriptionDomainEntity) {
    if (data) {
      if (data.inscriptionId) this.inscriptionId = data.inscriptionId;
      if (data.student) this.student = data.student;
      if (data.semester) this.semester = data.semester;
      if (data.groups) this.groups = data.groups;
      if (data.inscriptionState) this.inscriptionState = data.inscriptionState;
      if (data.dateTime) this.dateTime = data.dateTime;
    }
  }
}
