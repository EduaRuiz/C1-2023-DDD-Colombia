import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';
import { ClassDayPostgresEntity } from './class-day-postgres.entity';

/**
 * Clase encargada de representar la tabla en la base de datos
 *
 * @export
 * @class GroupPostgresEntity
 * @extends {GroupDomainEntity}
 */
@Entity('group', { schema: 'public' })
export class GroupPostgresEntity extends GroupDomainEntity {
  /**
   * Id del grupo
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

  /**
   * Id de la materia del grupo
   *
   * @type {string}
   * @memberof GroupPostgresEntity
   */
  @Column('character varying', { name: 'subject_id', length: 36 })
  subjectId: string;

  /**
   * Nombre de la materia del grupo
   *
   * @type {string}
   * @memberof GroupPostgresEntity
   */
  @Column('character varying', { name: 'subject_name', length: 50 })
  subjectName: string;

  /**
   * Nombre del profesor encargado del grupo
   *
   * @type {string}
   * @memberof GroupPostgresEntity
   */
  @Column('character varying', { name: 'professor_name', length: 50 })
  professorName: string;

  /**
   * Estado del grupo
   *
   * @type {string}
   * @memberof GroupPostgresEntity
   */
  @Column('character varying', { name: 'group_state', length: 20 })
  groupState: string;

  /**
   * Cupos disponibles
   *
   * @type {number}
   * @memberof GroupPostgresEntity
   */
  @Column('int', { name: 'quote_available' })
  quoteAvailable: number;

  /**
   * Lista de ClassDays relacionados
   *
   * @type {ClassDayPostgresEntity[]}
   * @memberof GroupPostgresEntity
   */
  @OneToMany(() => ClassDayPostgresEntity, (classDay) => classDay.group, {
    cascade: true,
  })
  classDays: ClassDayPostgresEntity[];

  /**
   * Inscripciones relacionadas al grupo
   *
   * @type {InscriptionPostgresEntity[]}
   * @memberof GroupPostgresEntity
   */
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
