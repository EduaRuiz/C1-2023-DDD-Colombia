import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import {
  GroupPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from '.';

@Entity('inscription')
export class InscriptionPostgresEntity extends InscriptionDomainEntity {
  @Index('inscription_primary_key', ['inscriptionId'], { unique: true })
  @Column('uuid', {
    primary: true,
    name: 'inscription_id',
    default: () => 'uuid_generate_v4()',
    nullable: false,
  })
  inscriptionId?: string;

  @Column('character varying', {
    name: 'inscription_state',
    length: 20,
    default: 'open',
  })
  inscriptionState: string;

  @Column({
    name: 'date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  dateTime?: Date;

  @ManyToOne(() => StudentPostgresEntity, (student) => student.inscription)
  @JoinColumn({ name: 'student_id' })
  student: StudentPostgresEntity;

  @ManyToOne(() => SemesterPostgresEntity, (semester) => semester.inscription)
  @JoinColumn({ name: 'semester_id' })
  semester: SemesterPostgresEntity;

  @ManyToMany(() => GroupPostgresEntity, (group) => group.inscription)
  @JoinTable({
    name: 'group_inscription',
    joinColumn: {
      name: 'inscription_id',
      referencedColumnName: 'inscriptionId',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'groupId',
    },
  })
  groups: GroupPostgresEntity[];
}
