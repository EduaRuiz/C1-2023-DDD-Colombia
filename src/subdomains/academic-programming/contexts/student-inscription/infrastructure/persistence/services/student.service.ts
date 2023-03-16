import { StudentPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService extends StudentPostgresService {}
