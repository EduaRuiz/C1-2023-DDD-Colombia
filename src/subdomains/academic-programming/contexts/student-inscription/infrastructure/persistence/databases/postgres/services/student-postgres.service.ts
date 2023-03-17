import { Injectable } from '@nestjs/common';
import { StudentPostgresRepository } from '../repositories';
import { StudentPostgresEntity } from '../entities';
import { IStudentDomainService } from '@contexts/student-inscription/domain/services';

/**
 * Servicio de estudiantes
 *
 * @export
 * @class StudentPostgresService
 * @implements {IStudentDomainService<StudentPostgresEntity>}
 */
@Injectable()
export class StudentPostgresService
  implements IStudentDomainService<StudentPostgresEntity>
{
  /**
   * Crea una instancia de StudentPostgresService.
   *
   * @param {StudentPostgresRepository} studentPostgresRepository
   * @memberof StudentPostgresService
   */
  constructor(
    private readonly studentPostgresRepository: StudentPostgresRepository,
  ) {}

  /**
   * Retorna estudiante
   *
   * @param {string} studentId Id estudiante
   * @return {Promise<StudentPostgresEntity>} Estudiante buscado
   * @memberof StudentPostgresService
   */
  getStudent(studentId: string): Promise<StudentPostgresEntity> {
    return this.studentPostgresRepository.findOneById(studentId);
  }
}
