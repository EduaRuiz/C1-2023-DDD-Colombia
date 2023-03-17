import { Injectable } from '@nestjs/common';
import { ClassDayPostgresRepository } from '../repositories';
import { ClassDayPostgresEntity } from '../entities';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';

/**
 * Servicio de classDay
 *
 * @export
 * @class ClassDayPostgresService
 * @implements {IClassDayDomainService<ClassDayPostgresEntity>}
 */
@Injectable()
export class ClassDayPostgresService
  implements IClassDayDomainService<ClassDayPostgresEntity>
{
  /**
   * Crea una instancia de ClassDayPostgresService.
   *
   * @param {ClassDayPostgresRepository} classDayPostgresRepository Repositorio de clases
   * @memberof ClassDayPostgresService
   */
  constructor(
    private readonly classDayPostgresRepository: ClassDayPostgresRepository,
  ) {}

  /**
   * Retorna classDay solicitado
   *
   * @param {string} classDayId
   * @return {Promise<ClassDayPostgresEntity>} ClassDay solicitado
   * @memberof ClassDayPostgresService
   */
  getClassDay(classDayId: string): Promise<ClassDayPostgresEntity> {
    return this.classDayPostgresRepository.findOneById(classDayId);
  }

  /**
   * Retorna lista de classDays
   *
   * @param {string} groupId Id group
   * @return {Promise<ClassDayPostgresEntity[]>} Lista de ClassDays
   * @memberof ClassDayPostgresService
   */
  getAllClassDaysByGroup(groupId: string): Promise<ClassDayPostgresEntity[]> {
    return this.classDayPostgresRepository.findAll();
  }
}
