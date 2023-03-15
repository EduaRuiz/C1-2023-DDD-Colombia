import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';

@Entity('semester')
export class SemesterPostgresEntity extends SemesterDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'semester_id',
    default: () => 'uuid_generate_v4()',
  })
  semesterId: string;

  @Column('date', { name: 'year' })
  year: Date;

  @Column('bigint', { name: 'part' })
  part: number;

  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.semester,
  )
  @JoinColumn()
  inscription?: InscriptionPostgresEntity[];
}
