import {
  IGroupDomainEntity,
  ISemesterDomainEntity,
  IStudentDomainEntity,
} from '.';
import {
  DateTimeValueObject,
  InscriptionIdValueObject,
  InscriptionStateValueObject,
} from '@contexts/student-inscription/domain/value-objects/inscription';
/**
 * Interfaz de la entidad Inscription contexto StudentInscription
 *
 * @export
 * @interface IInscriptionDomainEntity
 */
export interface IInscriptionDomainEntity {
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
  student: IStudentDomainEntity;
  /**
   * Semestre relacionado
   *
   * @type {SemesterDomainEntity}
   * @memberof InscriptionDomainEntity
   */
  semester: ISemesterDomainEntity;
  /**
   * Grupos asociados a la inscripción
   *
   * @type {GroupDomainEntity[]}
   * @memberof InscriptionDomainEntity
   */
  groups: IGroupDomainEntity[];
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
}
