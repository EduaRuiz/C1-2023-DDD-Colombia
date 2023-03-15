import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { InscriptionPostgresEntity } from '.';

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

  @Column('character varying', { name: 'group_state', length: 20 })
  groupState: string;

  @Column('bit', { name: 'quote_available' })
  quoteAvailable: number;

  @OneToMany(
    () => InscriptionPostgresEntity,
    (inscription) => inscription.groups,
  )
  @JoinColumn()
  inscription?: InscriptionPostgresEntity[];
}
