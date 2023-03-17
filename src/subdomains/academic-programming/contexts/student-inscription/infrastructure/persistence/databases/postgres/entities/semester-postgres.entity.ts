import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';

/**
 * Entidad que representa el semestre en la base
 *
 * @export
 * @class SemesterPostgresEntity
 * @extends {SemesterDomainEntity}
 */
@Entity('semester')
export class SemesterPostgresEntity extends SemesterDomainEntity {
  /**
   * Id del semestre
   *
   * @type {string}
   * @memberof SemesterPostgresEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'semester_id',
    default: () => 'uuid_generate_v4()',
  })
  semesterId: string;

  /**
   * Año correspondiente al semestre
   *
   * @type {Date}
   * @memberof SemesterPostgresEntity
   */
  @Column('date', { name: 'year' })
  year: Date;

  /**
   * Parte del año correspondiente
   *
   * @type {number}
   * @memberof SemesterPostgresEntity
   */
  @Column('int', { name: 'part' })
  part: number;

  /**
   * Inscripcion correspondiente
   *
   * @type {InscriptionPostgresEntity[]}
   * @memberof SemesterPostgresEntity
   */
  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.semester,
  )
  inscription?: InscriptionPostgresEntity[];
}
