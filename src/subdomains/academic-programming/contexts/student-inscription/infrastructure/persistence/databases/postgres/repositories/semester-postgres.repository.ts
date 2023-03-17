import { IRepositoryBaseInterface } from './interfaces';
import { SemesterPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class SemesterPostgresRepository
  implements IRepositoryBaseInterface<SemesterPostgresEntity>
{
  constructor(
    @InjectRepository(SemesterPostgresEntity)
    private semesterPostgresEntity: Repository<SemesterPostgresEntity>,
  ) {}
  async create(
    entity: SemesterPostgresEntity,
  ): Promise<SemesterPostgresEntity> {
    return this.semesterPostgresEntity.save(entity);
  }

  async update(
    entityId: string,
    entity: SemesterPostgresEntity,
  ): Promise<SemesterPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    const entityUpdated = {
      ...currentEntity,
      ...entity,
      semesterId: entityId,
    };
    return this.semesterPostgresEntity.save(entityUpdated);
  }

  async delete(entityId: string): Promise<SemesterPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.semesterPostgresEntity.remove(currentEntity);
  }

  findAll(): Promise<SemesterPostgresEntity[]> {
    return this.semesterPostgresEntity.find();
  }

  async findOneById(entityId: string): Promise<SemesterPostgresEntity> {
    const currentEntity = await this.semesterPostgresEntity.findOne({
      where: { semesterId: entityId },
    });
    if (currentEntity) {
      return currentEntity;
    }
    throw new NotFoundException('Semestre no encontrado');
  }
}
