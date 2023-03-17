import { SemesterPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

/**
 * Servicio de semestres
 *
 * @export
 * @class SemesterService
 * @extends {SemesterPostgresService}
 */
@Injectable()
export class SemesterService extends SemesterPostgresService {}
