import { IRepositoryBaseInterface } from './interfaces';
import { ClassDayPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Repositorio para classDay
 *
 * @export
 * @class ClassDayPostgresRepository
 * @implements {IRepositoryBaseInterface<ClassDayPostgresEntity>}
 */
export class ClassDayPostgresRepository
  implements IRepositoryBaseInterface<ClassDayPostgresEntity>
{
  /**
   * Crea una instancia ClassDayPostgresRepository.
   *
   * @param {Repository<ClassDayPostgresEntity>} classDayPostgresEntity
   * @memberof ClassDayPostgresRepository
   */
  constructor(
    @InjectRepository(ClassDayPostgresEntity)
    private classDayPostgresEntity: Repository<ClassDayPostgresEntity>,
  ) {}

  /**
   * Crea un classDay
   *
   * @param {ClassDayPostgresEntity} entity ClassDay
   * @return {Promise<ClassDayPostgresEntity>} ClassDay creado
   * @memberof ClassDayPostgresRepository
   */
  async create(
    entity: ClassDayPostgresEntity,
  ): Promise<ClassDayPostgresEntity> {
    return this.classDayPostgresEntity.save(entity);
  }

  /**
   * Actualiza un ClassDay
   *
   * @param {string} entityId Id classDay
   * @param {ClassDayPostgresEntity} entity ClassDay
   * @return {Promise<ClassDayPostgresEntity>} ClassDay actualizado
   * @memberof ClassDayPostgresRepository
   */
  async update(
    entityId: string,
    entity: ClassDayPostgresEntity,
  ): Promise<ClassDayPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    const entityUpdated = {
      ...currentEntity,
      ...entity,
      classDayId: entityId,
    };
    return this.classDayPostgresEntity.save(entityUpdated);
  }

  /**
   * Elimina ClassDay
   *
   * @param {string} entityId Id classDay
   * @return {Promise<ClassDayPostgresEntity>} ClassDay eliminado
   * @memberof ClassDayPostgresRepository
   */
  async delete(entityId: string): Promise<ClassDayPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.classDayPostgresEntity.remove(currentEntity);
  }

  /**
   * Retorna todos los classDays
   *
   * @return {Promise<ClassDayPostgresEntity[]>} Lista de classDays
   * @memberof ClassDayPostgresRepository
   */
  findAll(): Promise<ClassDayPostgresEntity[]> {
    return this.classDayPostgresEntity.find();
  }

  /**
   * Busca por id grupo
   *
   * @param {string} entityId Id grupo
   * @return {Promise<ClassDayPostgresEntity>} Grupo buscado
   * @memberof ClassDayPostgresRepository
   */
  async findOneById(entityId: string): Promise<ClassDayPostgresEntity> {
    const currentEntity = await this.classDayPostgresEntity.findOne({
      where: { classDayId: entityId },
    });
    if (currentEntity) {
      return currentEntity;
    }
    throw new NotFoundException('Semestre no encontrado');
  }
}
