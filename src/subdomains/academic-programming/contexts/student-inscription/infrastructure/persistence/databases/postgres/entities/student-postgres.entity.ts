import { StudentDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';

@Entity('student')
export class StudentPostgresEntity extends StudentDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'student_id',
    default: () => 'uuid_generate_v4()',
  })
  studentId: string;

  @Column('character varying', { name: 'full_name', length: 255 })
  fullName: string;

  @Column('character varying', { name: 'institutional_Mail', length: 255 })
  institutionalMail: string;

  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.student,
  )
  @JoinColumn()
  inscription?: InscriptionPostgresEntity[];
}
