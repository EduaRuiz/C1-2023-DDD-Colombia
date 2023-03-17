import { IRepositoryBaseInterface } from './interfaces';
import { StudentPostgresEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Repositorio estudiantes
 *
 * @export
 * @class StudentPostgresRepository
 * @implements {IRepositoryBaseInterface<StudentPostgresEntity>}
 */
export class StudentPostgresRepository
  implements IRepositoryBaseInterface<StudentPostgresEntity>
{
  /**
   * Crea una instancia de StudentPostgresRepository.
   *
   * @param {Repository<StudentPostgresEntity>} studentPostgresEntity
   * @memberof StudentPostgresRepository
   */
  constructor(
    @InjectRepository(StudentPostgresEntity)
    private studentPostgresEntity: Repository<StudentPostgresEntity>,
  ) {}

  /**
   * Crea estudiante
   *
   * @param {StudentPostgresEntity} entity Estudiante
   * @return {Promise<StudentPostgresEntity>} Estudiante creado
   * @memberof StudentPostgresRepository
   */
  async create(entity: StudentPostgresEntity): Promise<StudentPostgresEntity> {
    return this.studentPostgresEntity.save(entity);
  }

  /**
   * Actualiza estudiante
   *
   * @param {string} entityId Id estudiante
   * @param {StudentPostgresEntity} entity EStudiante
   * @return {Promise<StudentPostgresEntity>} Estudiante actualizado
   * @memberof StudentPostgresRepository
   */
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
    return this.studentPostgresEntity.save(entityUpdated);
  }

  /**
   * Elimina un estudiante
   *
   * @param {string} entityId Id estudiante
   * @return {Promise<StudentPostgresEntity>} Estudiante eliminado
   * @memberof StudentPostgresRepository
   */
  async delete(entityId: string): Promise<StudentPostgresEntity> {
    const currentEntity = await this.findOneById(entityId);
    return this.studentPostgresEntity.remove(currentEntity);
  }

  /**
   * Busca todos los estudiantes
   *
   * @return {Promise<StudentPostgresEntity[]>} Lista de estudiantes
   * @memberof StudentPostgresRepository
   */
  findAll(): Promise<StudentPostgresEntity[]> {
    return this.studentPostgresEntity.find();
  }

  /**
   * Busca estudiante por id
   *
   * @param {string} entityId Id estudiante
   * @return {Promise<StudentPostgresEntity>} EStudiante buscado
   * @memberof StudentPostgresRepository
   */
  async findOneById(entityId: string): Promise<StudentPostgresEntity> {
    const currentEntity = await this.studentPostgresEntity.findOneBy({
      studentId: entityId,
    });
    if (currentEntity) {
      return currentEntity;
    }
    throw new NotFoundException('Estudiante no encontrado!');
  }
}
