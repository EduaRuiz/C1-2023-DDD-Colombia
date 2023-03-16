import { Injectable } from '@nestjs/common';
import { SemesterPostgresRepository } from '../repositories';
import { SemesterPostgresEntity } from '../entities';
import { ISemesterDomainService } from '@contexts/student-inscription/domain/services';

@Injectable()
export class SemesterPostgresService
  implements ISemesterDomainService<SemesterPostgresEntity>
{
  constructor(
    private readonly semesterPostgresRepository: SemesterPostgresRepository,
  ) {}
  getSemester(semesterId: string): Promise<SemesterPostgresEntity> {
    return this.semesterPostgresRepository.findOneById(semesterId);
  }
}
