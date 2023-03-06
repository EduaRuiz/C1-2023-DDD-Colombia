import { IGroupDomainEntity } from './interfaces';
import {
  GroupIdValueObject,
  GroupStateValueObject,
  ProfessorNameValueObject,
  QuotaAvailableValueObject,
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
  groupId?: string | GroupIdValueObject;
  classDays?: ClassDayDomainEntity[];
  subjectName?: string | SubjectNameValueObject;
  professorName?: string | ProfessorNameValueObject;
  quoteAvailable?: number | QuotaAvailableValueObject;
  groupState?: string | GroupStateValueObject;
  inscription?: InscriptionDomainEntity;

  /**
   * Crea una instancia de GroupDomainEntity.
   * @param {IGroupDomainEntity} [data]
   * @memberof GroupDomainEntity
   */
  constructor(data?: IGroupDomainEntity) {
    if (data) {
      if (data?.groupId) this.groupId = data.groupId;
      if (data?.classDays) this.classDays = data.classDays;
      if (data?.subjectName) this.subjectName = data.subjectName;
      if (data?.professorName) this.professorName = data.professorName;
      if (data?.quoteAvailable) this.quoteAvailable = data.quoteAvailable;
      if (data?.groupState) this.groupState = data.groupState;
      if (data?.inscription) this.inscription = data.inscription;
    }
  }
}
