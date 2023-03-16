import { IRepositoryBaseInterface } from './interfaces';
import { StudentPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class StudentPostgresRepository
  implements IRepositoryBaseInterface<StudentPostgresEntity>
{
  constructor(
    @InjectRepository(StudentPostgresEntity)
    private studentPostgresEntity: Repository<StudentPostgresEntity>,
  ) {}
  async create(entity: StudentPostgresEntity): Promise<StudentPostgresEntity> {
    return this.studentPostgresEntity.save(entity);
  }

  async update(
    entityId: string,
    entity: StudentPostgresEntity,
  ): Promise<StudentPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    const entityUpdated = {
      ...currentEntity,
      ...entity,
      studentId: entityId,
    };
    try {
      return this.studentPostgresEntity.save(entityUpdated);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(entityId: string): Promise<StudentPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    try {
      return this.studentPostgresEntity.remove(currentEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(): Promise<StudentPostgresEntity[]> {
    try {
      return this.studentPostgresEntity.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneById(entityId: string): Promise<StudentPostgresEntity> {
    try {
      const currentEntity = await this.studentPostgresEntity.findOneBy({
        studentId: entityId,
      });
      if (currentEntity) {
        return currentEntity;
      }
      throw new NotFoundException('Estudiante no encontrado');
    } catch (error) {
      throw new NotFoundException('Estudiante no encontrado ' + error);
    }
  }
}
