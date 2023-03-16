import { IRepositoryBaseInterface } from './interfaces';
import { GroupPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    try {
      return this.groupPostgresEntity.save(entityUpdated);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(entityId: string): Promise<GroupPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    try {
      return this.groupPostgresEntity.remove(currentEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(): Promise<GroupPostgresEntity[]> {
    try {
      return this.groupPostgresEntity.find({ relations: ['classDays'] });
    } catch (error) {
      throw new BadRequestException(error);
    }
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
