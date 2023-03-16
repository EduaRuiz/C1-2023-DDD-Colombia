import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, OneToMany } from 'typeorm';
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

  @Column('int', { name: 'part' })
  part: number;

  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.semester,
  )
  inscription?: InscriptionPostgresEntity[];
}
