import { IRepositoryBaseInterface } from './interfaces';
import { InscriptionPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class InscriptionPostgresRepository
  implements IRepositoryBaseInterface<InscriptionPostgresEntity>
{
  constructor(
    @InjectRepository(InscriptionPostgresEntity)
    private inscriptionPostgresEntity: Repository<InscriptionPostgresEntity>,
  ) {}
  async create(
    entity: InscriptionPostgresEntity,
  ): Promise<InscriptionPostgresEntity> {
    return this.inscriptionPostgresEntity.save(entity);
  }

  async update(
    entityId: string,
    entity: InscriptionPostgresEntity,
  ): Promise<InscriptionPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    const entityUpdated = {
      ...currentEntity,
      ...entity,
      inscriptionId: entityId,
    };
    try {
      return this.inscriptionPostgresEntity.save(entityUpdated);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(entityId: string): Promise<InscriptionPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.inscriptionPostgresEntity.remove(currentEntity);
  }

  findAll(): Promise<InscriptionPostgresEntity[]> {
    return this.inscriptionPostgresEntity.find({
      relations: ['student', 'semester', 'groups', 'groups.classDays'],
    });
  }

  async findOneById(entityId: string): Promise<InscriptionPostgresEntity> {
    const currentEntity = await this.inscriptionPostgresEntity.findOne({
      where: { inscriptionId: entityId },
      relations: ['groups', 'student', 'semester', 'groups.classDays'],
    });
    if (currentEntity) {
      return currentEntity;
    }
    throw new NotFoundException('Inscripcion no encontrada');
  }
}
