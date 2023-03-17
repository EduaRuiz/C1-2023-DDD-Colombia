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

/**
 * Entidad que representa una inscripcion en la base de datos
 *
 * @export
 * @class InscriptionPostgresEntity
 * @extends {InscriptionDomainEntity}
 */
@Entity('inscription')
export class InscriptionPostgresEntity extends InscriptionDomainEntity {
  /**
   * Id de la inscripcion
   *
   * @type {string}
   * @memberof InscriptionPostgresEntity
   */
  @Index('inscription_primary_key', ['inscriptionId'], { unique: true })
  @Column('uuid', {
    primary: true,
    name: 'inscription_id',
    default: () => 'uuid_generate_v4()',
    nullable: false,
  })
  inscriptionId?: string;

  /**
   * Estado de la inscripcion
   *
   * @type {string}
   * @memberof InscriptionPostgresEntity
   */
  @Column('character varying', {
    name: 'inscription_state',
    length: 20,
    default: 'open',
  })
  inscriptionState: string;

  /**
   * Fecha creación de la inscripcion
   *
   * @type {Date}
   * @memberof InscriptionPostgresEntity
   */
  @Column({
    name: 'date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  dateTime?: Date;

  /**
   * EStudiante relacionado a la inscripcion
   *
   * @type {StudentPostgresEntity}
   * @memberof InscriptionPostgresEntity
   */
  @ManyToOne(() => StudentPostgresEntity, (student) => student.inscription)
  @JoinColumn({ name: 'student_id' })
  student: StudentPostgresEntity;

  /**
   * Semestre relacionado a la inscripcion
   *
   * @type {SemesterPostgresEntity}
   * @memberof InscriptionPostgresEntity
   */
  @ManyToOne(() => SemesterPostgresEntity, (semester) => semester.inscription)
  @JoinColumn({ name: 'semester_id' })
  semester: SemesterPostgresEntity;

  /**
   * Grupos relacionados a la inscripcion
   *
   * @type {GroupPostgresEntity[]}
   * @memberof InscriptionPostgresEntity
   */
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
