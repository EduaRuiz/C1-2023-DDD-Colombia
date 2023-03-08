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
  /**
   * ID de la Clase
   *
   * @type {(string | ClassDayIdValueObject)} UUID v4
   * @memberof ClassDayDomainEntity
   */
  classDayId?: string | ClassDayIdValueObject;
  /**
   * Dia de la semana en el que se realiza la Clase
   *
   * @type {(string | WeekDayValueObject)}
   * @memberof IClassDayDomainEntity
   */
  weekDay?: string | WeekDayValueObject;
  /**
   * Hora de inicio de la Clase
   *
   * @type {(number | StartTimeValueObject)}
   * @memberof IClassDayDomainEntity
   */
  startTime?: number | StartTimeValueObject;
  /**
   * Duración de la clase
   *
   * @type {(number | DurationValueObject)}
   * @memberof IClassDayDomainEntity
   */
  duration?: number | DurationValueObject;
  /**
   * Grupo al que esta relacionada la interfaz
   *
   * @type {IGroupDomainEntity}
   * @memberof IClassDayDomainEntity
   */
  group?: IGroupDomainEntity;
}
