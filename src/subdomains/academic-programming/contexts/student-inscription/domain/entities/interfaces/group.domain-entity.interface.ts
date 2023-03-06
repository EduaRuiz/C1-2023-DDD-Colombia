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
  groupId?: string | GroupIdValueObject;
  classDays?: IClassDayDomainEntity[];
  subjectName?: string | SubjectNameValueObject;
  professorName?: string | ProfessorNameValueObject;
  quoteAvailable?: number | QuotaAvailableValueObject;
  groupState?: string | GroupStateValueObject;
  inscription?: IInscriptionDomainEntity;
}
