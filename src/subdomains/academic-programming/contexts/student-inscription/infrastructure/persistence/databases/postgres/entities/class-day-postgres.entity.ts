import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClassDayDomainEntity } from '../../../../../domain/entities';
import { GroupPostgresEntity } from './group-postgres.entity';

/**
 * Entidad de ClassDay
 *
 * @export
 * @class ClassDayPostgresEntity
 * @implements {ClassDayDomainEntity}
 */
@Entity('class-day')
export class ClassDayPostgresEntity implements ClassDayDomainEntity {
  /**
   * Id ClassDay
   *
   * @type {string}
   * @memberof ClassDayPostgresEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'class_day_id',
    default: () => 'uuid_generate_v4()',
  })
  classDayId: string;

  /**
   * WeekDay
   *
   * @type {string}
   * @memberof ClassDayPostgresEntity
   */
  @Column('character varying', { name: 'week_day' })
  weekDay: string;

  /**
   * Hora de inicio
   *
   * @type {number}
   * @memberof ClassDayPostgresEntity
   */
  @Column('int', { name: 'start_time' })
  startTime: number;

  /**
   * Duración de la clase
   *
   * @type {number}
   * @memberof ClassDayPostgresEntity
   */
  @Column('int', { name: 'duration' })
  duration: number;

  /**
   * Grupo asociado
   *
   * @type {GroupPostgresEntity}
   * @memberof ClassDayPostgresEntity
   */
  @ManyToOne(() => GroupPostgresEntity, (group) => group.classDays)
  @JoinColumn({ name: 'group_id' })
  group: GroupPostgresEntity;
}
