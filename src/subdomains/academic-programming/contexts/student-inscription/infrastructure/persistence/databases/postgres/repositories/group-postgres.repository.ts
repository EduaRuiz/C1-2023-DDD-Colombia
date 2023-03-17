import { IRepositoryBaseInterface } from './interfaces';
import { GroupPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class GroupPostgresRepository
  implements IRepositoryBaseInterface<GroupPostgresEntity>
{
  constructor(
    @InjectRepository(GroupPostgresEntity)
    private groupPostgresEntity: Repository<GroupPostgresEntity>,
  ) {}
  async create(entity: GroupPostgresEntity): Promise<GroupPostgresEntity> {
    return this.groupPostgresEntity.save(entity);
  }

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

  async delete(entityId: string): Promise<GroupPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.groupPostgresEntity.remove(currentEntity);
  }

  findAll(): Promise<GroupPostgresEntity[]> {
    return this.groupPostgresEntity.find({ relations: ['classDays'] });
  }

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
