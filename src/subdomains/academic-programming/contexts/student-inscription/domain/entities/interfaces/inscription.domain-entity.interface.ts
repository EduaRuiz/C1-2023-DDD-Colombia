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
  inscriptionId?: string | InscriptionIdValueObject;
  student?: IStudentDomainEntity;
  semester?: ISemesterDomainEntity;
  groups?: IGroupDomainEntity[];
  inscriptionState?: string | InscriptionStateValueObject;
  dateTime?: Date | DateTimeValueObject;
}
