import { IGroupDomainEntity } from '.';
import {
  ClassDayIdValueObject,
  DurationValueObject,
  StartTimeValueObject,
  WeekDayValueObject,
} from '@contexts/student-inscription/domain/value-objects/class-day';

/**
 * Interfaz de la entidad ClassDay contexto StudentInscription
 *
 * @export
 * @interface IClassDayDomainEntity
 */
export interface IClassDayDomainEntity {
  classDayId?: string | ClassDayIdValueObject;
  weekDay?: string | WeekDayValueObject;
  startTime?: number | StartTimeValueObject;
  duration?: number | DurationValueObject;
  group?: IGroupDomainEntity;
}
