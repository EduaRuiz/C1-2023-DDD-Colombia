import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import {
  GroupPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from '.';

@Entity('inscription')
export class InscriptionPostgresEntity extends InscriptionDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'inscription_id',
    default: () => 'uuid_generate_v4()',
  })
  inscriptionId?: string;

  @Column('character varying', { name: 'inscriptionState', length: 20 })
  inscriptionState: string;

  @ManyToOne(() => StudentPostgresEntity, (student) => student.inscription)
  @JoinColumn()
  student: StudentPostgresEntity;

  @ManyToOne(() => SemesterPostgresEntity, (semester) => semester.inscription)
  @JoinColumn()
  semester: SemesterPostgresEntity;

  @ManyToMany(() => GroupPostgresEntity, (group) => group.inscription)
  @JoinColumn()
  groups: GroupPostgresEntity[];
}
