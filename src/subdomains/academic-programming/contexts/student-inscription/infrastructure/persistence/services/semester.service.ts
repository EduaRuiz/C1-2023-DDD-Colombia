import { SemesterPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SemesterService extends SemesterPostgresService {}
