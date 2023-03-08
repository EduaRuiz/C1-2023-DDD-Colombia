import { IClassDayDomainEntity, IInscriptionDomainEntity } from '.';
import {
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
  SubjectNameValueObject,
} from '@contexts/student-inscription/domain/value-objects/group';

/**
 * Interfaz de la entidad GroupDomain contexto StudentInscription
 *
 * @export
 * @interface IGroupDomainEntity
 */
export interface IGroupDomainEntity {
  /**
   * Id del grupo
   *
   * @type {(string | GroupIdValueObject)} UUID v4
   * @memberof GroupDomainEntity
   */
  groupId?: string | GroupIdValueObject;
  /**
   * Dias de clase
   *
   * @type {ClassDayDomainEntity[]} Lista de objetos de días en el que se imparte la clase
   * @memberof GroupDomainEntity
   */
  classDays?: IClassDayDomainEntity[];
  /**
   * Nombre de la materia que se imparte en el grupo
   *
   * @type {(string | SubjectNameValueObject)}
   * @memberof GroupDomainEntity
   */
  subjectName?: string | SubjectNameValueObject;
  /**
   * Nombre del profesor que dicta la materia
   *
   * @type {(string | ProfessorNameValueObject)}
   * @memberof GroupDomainEntity
   */
  professorName?: string | ProfessorNameValueObject;
  /**
   * Disponibilidad del grupo
   *
   * @type {(number | QuotaAvailableValueObject)} Cupo de estudiantes que aun permite el grupo
   * @memberof GroupDomainEntity
   */
  quoteAvailable?: number | QuotaAvailableValueObject;
  /**
   * Estado del grupo
   *
   * @type {(string | GroupStateValueObject)} Permite: open | closed | cancelled | finalized
   * @memberof GroupDomainEntity
   */
  groupState?: string | GroupStateValueObject;
  /**
   * Inscripción a la que se asocia el grupo
   *
   * @type {InscriptionDomainEntity}
   * @memberof GroupDomainEntity
   */
  inscription?: IInscriptionDomainEntity;
}
