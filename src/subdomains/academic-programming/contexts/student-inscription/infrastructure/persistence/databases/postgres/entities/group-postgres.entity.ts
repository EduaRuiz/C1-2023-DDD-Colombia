import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';
import { ClassDayPostgresEntity } from './class-day-postgres.entity';

@Entity('group', { schema: 'public' })
export class GroupPostgresEntity extends GroupDomainEntity {
  /**
   * Clase encargada de representar la tabla en la base de datos
   *
   * @type {string}
   * @memberof GroupPostgresEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'group_id',
    default: () => 'uuid_generate_v4()',
  })
  groupId: string;

  @Column('character varying', { name: 'subject_id', length: 36 })
  subjectId: string;

  @Column('character varying', { name: 'subject_name', length: 50 })
  subjectName: string;

  @Column('character varying', { name: 'professor_name', length: 50 })
  professorName: string;

  @Column('character varying', { name: 'group_state', length: 20 })
  groupState: string;

  @Column('int', { name: 'quote_available' })
  quoteAvailable: number;

  @OneToMany(() => ClassDayPostgresEntity, (classDay) => classDay.group, {
    cascade: true,
  })
  classDays: ClassDayPostgresEntity[];

  @ManyToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.groups,
  )
  @JoinTable({
    name: 'group_inscription',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'groupId',
    },
    inverseJoinColumn: {
      name: 'inscription_id',
      referencedColumnName: 'inscriptionId',
    },
  })
  inscription: InscriptionPostgresEntity[];
}
