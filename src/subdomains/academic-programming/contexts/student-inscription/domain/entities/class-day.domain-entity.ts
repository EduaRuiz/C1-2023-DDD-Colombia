import { IClassDayDomainEntity } from './interfaces';
import {
  ClassDayIdValueObject,
  DurationValueObject,
  StartTimeValueObject,
  WeekDayValueObject,
} from '@contexts/student-inscription/domain/value-objects/class-day';
import { GroupDomainEntity } from '.';

/**
 * Base de la entidad ClassDay contexto StudentInscription
 *
 * @export
 * @class ClassDayDomainEntity
 * @implements {IClassDayDomainEntity}
 */
export class ClassDayDomainEntity implements IClassDayDomainEntity {
  /**
   * ID de la Clase
   *
   * @type {(string | ClassDayIdValueObject)} UUID v4
   * @memberof ClassDayDomainEntity
   */
  classDayId: string | ClassDayIdValueObject;
  /**
   * Dia de la semana en el que se realiza la Clase
   *
   * @type {(string | WeekDayValueObject)} Valores L, M, MC, J, V, S
   * @memberof ClassDayDomainEntity
   */
  weekDay: string | WeekDayValueObject;
  /**
   * Hora de inicio de la Clase
   *
   * @type {(number | StartTimeValueObject)} Valores entre 7 y 20 (horas del dia 0-24)
   * @memberof ClassDayDomainEntity
   */
  startTime: number | StartTimeValueObject;
  /**
   * Duración de la clase
   *
   * @type {(number | DurationValueObject)} Valores entre 1 a 4 horas
   * @memberof ClassDayDomainEntity
   */
  duration: number | DurationValueObject;
  /**
   * Grupo al que esta relacionada la clase
   *
   * @type {GroupDomainEntity}
   * @memberof ClassDayDomainEntity
   */
  group?: GroupDomainEntity;

  /**
   * Crea una instancia de ClassDayDomainEntity.
   * @param {IClassDayDomainEntity} [data] Información relacionada a la entidad
   * @memberof ClassDayDomainEntity
   */
  constructor(data?: IClassDayDomainEntity) {
    if (data) {
      if (data?.classDayId) this.classDayId = data.classDayId;
      if (data?.weekDay) this.weekDay = data.weekDay;
      if (data?.startTime) this.startTime = data.startTime;
      if (data?.duration) this.duration = data.duration;
      if (data?.group) this.group = data.group as GroupDomainEntity;
    }
  }
}
