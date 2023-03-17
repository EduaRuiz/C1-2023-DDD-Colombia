import { IRepositoryBaseInterface } from './interfaces';
import { SemesterPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Repositorio de semestres
 *
 * @export
 * @class SemesterPostgresRepository
 * @implements {IRepositoryBaseInterface<SemesterPostgresEntity>}
 */
export class SemesterPostgresRepository
  implements IRepositoryBaseInterface<SemesterPostgresEntity>
{
  /**
   * Crea una instancia de SemesterPostgresRepository.
   *
   * @param {Repository<SemesterPostgresEntity>} semesterPostgresEntity
   * @memberof SemesterPostgresRepository
   */
  constructor(
    @InjectRepository(SemesterPostgresEntity)
    private semesterPostgresEntity: Repository<SemesterPostgresEntity>,
  ) {}

  /**
   * Crea un semestre
   *
   * @param {SemesterPostgresEntity} entity Semestre
   * @return {Promise<SemesterPostgresEntity>} Semestre creado
   * @memberof SemesterPostgresRepository
   */
  async create(
    entity: SemesterPostgresEntity,
  ): Promise<SemesterPostgresEntity> {
    return this.semesterPostgresEntity.save(entity);
  }

  /**
   * Actualiza semestre
   *
   * @param {string} entityId Id semestre
   * @param {SemesterPostgresEntity} entity Semestre
   * @return {Promise<SemesterPostgresEntity>} Semestre actualizado
   * @memberof SemesterPostgresRepository
   */
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

  /**
   * Elimina Semestre
   *
   * @param {string} entityId Id semestre
   * @return {Promise<SemesterPostgresEntity>} Semestre eliminado
   * @memberof SemesterPostgresRepository
   */
  async delete(entityId: string): Promise<SemesterPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.semesterPostgresEntity.remove(currentEntity);
  }

  /**
   * Retorna todos los semestres
   *
   * @return {Promise<SemesterPostgresEntity[]>} Lista de semestres
   * @memberof SemesterPostgresRepository
   */
  findAll(): Promise<SemesterPostgresEntity[]> {
    return this.semesterPostgresEntity.find();
  }

  /**
   * Busca semestre por id
   *
   * @param {string} entityId Id semestre
   * @return {Promise<SemesterPostgresEntity>} Semestre buscado
   * @memberof SemesterPostgresRepository
   */
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
