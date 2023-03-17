import { IRepositoryBaseInterface } from './interfaces';
import { InscriptionPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

/**
 * Encargado del CRUD de inscripciones
 *
 * @export
 * @class InscriptionPostgresRepository
 * @implements {IRepositoryBaseInterface<InscriptionPostgresEntity>}
 */
export class InscriptionPostgresRepository
  implements IRepositoryBaseInterface<InscriptionPostgresEntity>
{
  /**
   * Crea una entidad InscriptionPostgresRepository.
   *
   * @param {Repository<InscriptionPostgresEntity>} inscriptionPostgresEntity
   * @memberof InscriptionPostgresRepository
   */
  constructor(
    @InjectRepository(InscriptionPostgresEntity)
    private inscriptionPostgresEntity: Repository<InscriptionPostgresEntity>,
  ) {}

  /**
   * Crea inscripcion
   *
   * @param {InscriptionPostgresEntity} entity Inscripcion
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion creada
   * @memberof InscriptionPostgresRepository
   */
  async create(
    entity: InscriptionPostgresEntity,
  ): Promise<InscriptionPostgresEntity> {
    return this.inscriptionPostgresEntity.save(entity);
  }

  /**
   * Actualiza inscripcion
   *
   * @param {string} entityId Id inscripcion
   * @param {InscriptionPostgresEntity} entity Inscripcion
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion actualizada
   * @memberof InscriptionPostgresRepository
   */
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

  /**
   * Elimina inscripcion
   *
   * @param {string} entityId Inscripcion id
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion eliminada
   * @memberof InscriptionPostgresRepository
   */
  async delete(entityId: string): Promise<InscriptionPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.inscriptionPostgresEntity.remove(currentEntity);
  }

  /**
   * Todas las inscripciones
   *
   * @return {Promise<InscriptionPostgresEntity[]>} Lista de inscripciones
   * @memberof InscriptionPostgresRepository
   */
  findAll(): Promise<InscriptionPostgresEntity[]> {
    return this.inscriptionPostgresEntity.find({
      relations: ['student', 'semester', 'groups', 'groups.classDays'],
    });
  }

  /**
   * Busca grupo por id
   *
   * @param {string} entityId Id grupo
   * @return {Promise<InscriptionPostgresEntity>} Grupo buscado
   * @memberof InscriptionPostgresRepository
   */
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
