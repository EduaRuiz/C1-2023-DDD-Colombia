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
  /**
   * Id de la inscripción
   *
   * @type {(string | InscriptionIdValueObject)}
   * @memberof InscriptionDomainEntity
   */
  inscriptionId?: string | InscriptionIdValueObject;
  /**
   * Estudiante relacionado
   *
   * @type {StudentDomainEntity}
   * @memberof InscriptionDomainEntity
   */
  student: StudentDomainEntity;
  /**
   * Semestre relacionado
   *
   * @type {SemesterDomainEntity}
   * @memberof InscriptionDomainEntity
   */
  semester: SemesterDomainEntity;
  /**
   * Grupos asociados a la inscripción
   *
   * @type {GroupDomainEntity[]}
   * @memberof InscriptionDomainEntity
   */
  groups: GroupDomainEntity[];
  /**
   * Estado de la inscripción
   *
   * @type {(string | InscriptionStateValueObject)} Permite: cancelled | completed | active
   * @memberof InscriptionDomainEntity
   */
  inscriptionState: string | InscriptionStateValueObject;
  /**
   * Fecha de creación de la inscripción
   *
   * @type {(Date | DateTimeValueObject)}
   * @memberof InscriptionDomainEntity
   */
  dateTime?: Date | DateTimeValueObject;

  /**
   * Crea una instancia de InscriptionDomainEntity.
   * @param {IInscriptionDomainEntity} [data] Información relacionada a la entidad
   * @memberof InscriptionDomainEntity
   */
  constructor(data?: IInscriptionDomainEntity) {
    if (data) {
      if (data.inscriptionId) this.inscriptionId = data.inscriptionId;
      if (data.student) this.student = data.student as StudentDomainEntity;
      if (data.semester) this.semester = data.semester as SemesterDomainEntity;
      if (data.groups) this.groups = data.groups as GroupDomainEntity[];
      if (data.inscriptionState) this.inscriptionState = data.inscriptionState;
      if (data.dateTime) this.dateTime = data.dateTime;
    }
  }
}
