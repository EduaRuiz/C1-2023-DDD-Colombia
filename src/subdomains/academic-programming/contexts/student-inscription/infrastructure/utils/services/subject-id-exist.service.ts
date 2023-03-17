import { ISubjectIdExist } from '@contexts/student-inscription/domain';
import { ISubjectIdExistDomainService } from '@contexts/student-inscription/domain/services/subject-id-exist.domain-service';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubjectIdExistService implements ISubjectIdExistDomainService {
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
