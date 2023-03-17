import { StudentPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

/**
 * Servicio de estudiantes
 *
 * @export
 * @class StudentService
 * @extends {StudentPostgresService}
 */
@Injectable()
export class StudentService extends StudentPostgresService {}
