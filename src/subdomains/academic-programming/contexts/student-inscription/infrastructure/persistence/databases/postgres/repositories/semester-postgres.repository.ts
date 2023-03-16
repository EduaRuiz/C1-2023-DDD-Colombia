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
    try {
      return this.semesterPostgresEntity.save(entityUpdated);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(entityId: string): Promise<SemesterPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    try {
      return this.semesterPostgresEntity.remove(currentEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(): Promise<SemesterPostgresEntity[]> {
    try {
      return this.semesterPostgresEntity.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneById(entityId: string): Promise<SemesterPostgresEntity> {
    try {
      const currentEntity = await this.semesterPostgresEntity.findOne({
        where: { semesterId: entityId },
      });
      if (currentEntity) {
        return currentEntity;
      }
      throw new NotFoundException('Semestre no encontrado');
    } catch (error) {
      throw new NotFoundException('Semestre no encontrado ' + error);
    }
  }
}
