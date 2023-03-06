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
  classDayId?: string | ClassDayIdValueObject;
  weekDay?: string | WeekDayValueObject;
  startTime?: number | StartTimeValueObject;
  duration?: number | DurationValueObject;
  group?: GroupDomainEntity;

  /**
   * Crea una instancia de ClassDayDomainEntity.
   * @param {IClassDayDomainEntity} [data]
   * @memberof ClassDayDomainEntity
   */
  constructor(data?: IClassDayDomainEntity) {
    if (data) {
      if (data?.classDayId) this.classDayId = data.classDayId;
      if (data?.weekDay) this.weekDay = data.weekDay;
      if (data?.startTime) this.startTime = data.startTime;
      if (data?.duration) this.duration = data.duration;
      if (data?.group) this.group = data.group;
    }
  }
}
