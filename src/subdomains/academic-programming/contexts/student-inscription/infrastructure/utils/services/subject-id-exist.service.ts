import { ISubjectIdExist } from '@contexts/student-inscription/domain';
import { ISubjectIdExistDomainService } from '@contexts/student-inscription/domain/services/subject-id-exist.domain-service';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio de consulta existencia materia fuera del contexto
 *
 * @export
 * @class SubjectIdExistService
 * @implements {ISubjectIdExistDomainService}
 */
@Injectable()
export class SubjectIdExistService implements ISubjectIdExistDomainService {
  /**
   * Crea una instancia de SubjectIdExistService.
   *
   * @param {HttpService} httpService
   * @memberof SubjectIdExistService
   */
  constructor(private readonly httpService: HttpService) {}
  async exist(subjectId: string): Promise<ISubjectIdExist> {
    const data = await firstValueFrom(
      this.httpService.get<ISubjectIdExist>(
        'http://localhost:3000/subject-id-exist/' + subjectId,
      ),
    );
    return data.data;
  }
}
