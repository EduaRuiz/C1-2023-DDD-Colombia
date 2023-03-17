import { StudentDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';

/**
 * Entidad que representa estudiantes en la base
 *
 * @export
 * @class StudentPostgresEntity
 * @extends {StudentDomainEntity}
 */
@Entity('student')
export class StudentPostgresEntity extends StudentDomainEntity {
  /**
   * Id estudiante
   *
   * @type {string}
   * @memberof StudentPostgresEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'student_id',
    default: () => 'uuid_generate_v4()',
  })
  studentId: string;

  /**
   * Nombre del estudiante
   *
   * @type {string}
   * @memberof StudentPostgresEntity
   */
  @Column('character varying', { name: 'full_name', length: 255 })
  fullName: string;

  /**
   * Correo del estudiante
   *
   * @type {string}
   * @memberof StudentPostgresEntity
   */
  @Column('character varying', { name: 'institutional_mail', length: 255 })
  institutionalMail: string;

  /**
   * Inscripcion relacionada
   *
   * @type {InscriptionPostgresEntity[]}
   * @memberof StudentPostgresEntity
   */
  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.student,
  )
  inscription?: InscriptionPostgresEntity[];
}
