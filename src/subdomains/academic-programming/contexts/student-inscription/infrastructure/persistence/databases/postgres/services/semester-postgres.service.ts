import { Injectable } from '@nestjs/common';
import { SemesterPostgresRepository } from '../repositories';
import { SemesterPostgresEntity } from '../entities';
import { ISemesterDomainService } from '@contexts/student-inscription/domain/services';

/**
 * Servicio de semestres
 *
 * @export
 * @class SemesterPostgresService
 * @implements {ISemesterDomainService<SemesterPostgresEntity>}
 */
@Injectable()
export class SemesterPostgresService
  implements ISemesterDomainService<SemesterPostgresEntity>
{
  /**
   * Crea una instancia de SemesterPostgresService.
   *
   * @param {SemesterPostgresRepository} semesterPostgresRepository
   * @memberof SemesterPostgresService
   */
  constructor(
    private readonly semesterPostgresRepository: SemesterPostgresRepository,
  ) {}

  /**
   * Retorna semestre
   *
   * @param {string} semesterId Id semestre
   * @return {Promise<SemesterPostgresEntity>} Semestre buscado
   * @memberof SemesterPostgresService
   */
  getSemester(semesterId: string): Promise<SemesterPostgresEntity> {
    return this.semesterPostgresRepository.findOneById(semesterId);
  }
}
