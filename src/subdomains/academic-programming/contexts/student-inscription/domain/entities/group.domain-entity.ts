import { IGroupDomainEntity } from './interfaces';
import {
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
  SubjectIdValueObject,
  SubjectNameValueObject,
} from '@contexts/student-inscription/domain/value-objects/group';
import { ClassDayDomainEntity, InscriptionDomainEntity } from '.';

/**
 * Base de la entidad Group contexto StudentInscription
 *
 * @export
 * @class GroupDomainEntity
 * @implements {IGroupDomainEntity}
 */
export class GroupDomainEntity implements IGroupDomainEntity {
  /**
   * Id del grupo
   *
   * @type {(string | GroupIdValueObject)} UUID v4
   * @memberof GroupDomainEntity
   */
  groupId: string | GroupIdValueObject;
  /**
   * Dias de clase
   *
   * @type {ClassDayDomainEntity[]} Lista de objetos de días en el que se imparte la clase
   * @memberof GroupDomainEntity
   */
  classDays: ClassDayDomainEntity[];
  /**
   * Nombre de la materia que se imparte en el grupo
   *
   * @type {(string | SubjectNameValueObject)}
   * @memberof GroupDomainEntity
   */
  subjectName: string | SubjectNameValueObject;
  /**
   * Id de la materia que se imparte en el grupo
   *
   * @type {(string | SubjectIdValueObject)}
   * @memberof GroupDomainEntity
   */
  subjectId: string | SubjectIdValueObject;
  /**
   * Nombre del profesor que dicta la materia
   *
   * @type {(string | ProfessorNameValueObject)}
   * @memberof GroupDomainEntity
   */
  professorName: string | ProfessorNameValueObject;
  /**
   * Disponibilidad del grupo
   *
   * @type {(number | QuotaAvailableValueObject)} Cupo de estudiantes que aun permite el grupo
   * @memberof GroupDomainEntity
   */
  quoteAvailable: number | QuotaAvailableValueObject;
  /**
   * Estado del grupo
   *
   * @type {(string | GroupStateValueObject)} Permite: open | closed | cancelled | finalized
   * @memberof GroupDomainEntity
   */
  groupState: string | GroupStateValueObject;
  /**
   * Inscripción a la que se asocia el grupo
   *
   * @type {InscriptionDomainEntity}
   * @memberof GroupDomainEntity
   */
  inscription?: InscriptionDomainEntity;

  /**
   * Crea una instancia de GroupDomainEntity.
   * @param {IGroupDomainEntity} [data] Información relacionada a la entidad
   * @memberof GroupDomainEntity
   */
  constructor(data: IGroupDomainEntity) {
    this.groupId = data.groupId;
    this.classDays = data.classDays as ClassDayDomainEntity[];
    this.subjectName = data.subjectName;
    this.professorName = data.professorName;
    this.quoteAvailable = data.quoteAvailable;
    this.groupState = data.groupState;
    if (data?.inscription)
      this.inscription = data.inscription as InscriptionDomainEntity;
  }
}
