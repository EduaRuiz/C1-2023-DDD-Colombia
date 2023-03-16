import { Injectable } from '@nestjs/common';
import { StudentPostgresRepository } from '../repositories';
import { StudentPostgresEntity } from '../entities';
import { IStudentDomainService } from '@contexts/student-inscription/domain/services';

@Injectable()
export class StudentPostgresService
  implements IStudentDomainService<StudentPostgresEntity>
{
  constructor(
    private readonly studentPostgresRepository: StudentPostgresRepository,
  ) {}
  getStudent(studentId: string): Promise<StudentPostgresEntity> {
    return this.studentPostgresRepository.findOneById(studentId);
  }
}
