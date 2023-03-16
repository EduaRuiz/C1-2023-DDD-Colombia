import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClassDayDomainEntity } from '../../../../../domain/entities';
import { GroupPostgresEntity } from './group-postgres.entity';

@Entity('class-day')
export class ClassDayPostgresEntity implements ClassDayDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'class_day_id',
    default: () => 'uuid_generate_v4()',
  })
  classDayId: string;

  @Column('character varying', { name: 'week_day' })
  weekDay: string;

  @Column('int', { name: 'start_time' })
  startTime: number;

  @Column('int', { name: 'duration' })
  duration: number;

  @ManyToOne(() => GroupPostgresEntity, (group) => group.classDays)
  @JoinColumn({ name: 'group_id' })
  group: GroupPostgresEntity;
}
