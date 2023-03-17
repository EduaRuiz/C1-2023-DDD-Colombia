import { IRepositoryBaseInterface } from './interfaces';
import { GroupPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Repositorio encargado de los grupos
 *
 * @export
 * @class GroupPostgresRepository
 * @implements {IRepositoryBaseInterface<GroupPostgresEntity>}
 */
export class GroupPostgresRepository
  implements IRepositoryBaseInterface<GroupPostgresEntity>
{
  /**
   * Crea una instancia de GroupPostgresRepository.
   *
   * @param {Repository<GroupPostgresEntity>} groupPostgresEntity
   * @memberof GroupPostgresRepository
   */
  constructor(
    @InjectRepository(GroupPostgresEntity)
    private groupPostgresEntity: Repository<GroupPostgresEntity>,
  ) {}

  /**
   * Crea un grupo
   *
   * @param {GroupPostgresEntity} entity Grupo
   * @return {Promise<GroupPostgresEntity>} Grupo creado
   * @memberof GroupPostgresRepository
   */
  async create(entity: GroupPostgresEntity): Promise<GroupPostgresEntity> {
    return this.groupPostgresEntity.save(entity);
  }

  /**
   * Actualiza
   *
   * @param {string} entityId Id grupo
   * @param {GroupPostgresEntity} entity Grupo
   * @return {Promise<GroupPostgresEntity>} Retorna grupo
   * @memberof GroupPostgresRepository
   */
  async update(
    entityId: string,
    entity: GroupPostgresEntity,
  ): Promise<GroupPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    const entityUpdated = {
      ...currentEntity,
      ...entity,
      groupId: entityId,
    };
    return this.groupPostgresEntity.save(entityUpdated);
  }

  /**
   * Elimina
   *
   * @param {string} entityId Id grupo
   * @return {Promise<GroupPostgresEntity>} Grupo
   * @memberof GroupPostgresRepository
   */
  async delete(entityId: string): Promise<GroupPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.groupPostgresEntity.remove(currentEntity);
  }

  /**
   * Retorna todos los grupos
   *
   * @return {Promise<GroupPostgresEntity[]>} Lista de grupos
   * @memberof GroupPostgresRepository
   */
  findAll(): Promise<GroupPostgresEntity[]> {
    return this.groupPostgresEntity.find({ relations: ['classDays'] });
  }

  /**
   * Busca por id
   *
   * @param {string} entityId Id del grupo
   * @return {Promise<GroupPostgresEntity>} Grupo
   * @memberof GroupPostgresRepository
   */
  async findOneById(entityId: string): Promise<GroupPostgresEntity> {
    const currentEntity = await this.groupPostgresEntity.findOne({
      where: { groupId: entityId },
      relations: ['classDays'],
    });
    if (currentEntity) {
      return currentEntity;
    }
    throw new NotFoundException('Grupo no encontrado!');
  }
}
