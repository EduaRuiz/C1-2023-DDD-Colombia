import { InscriptionPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

/**
 * Servicio de inscripciones
 *
 * @export
 * @class InscriptionService
 * @extends {InscriptionPostgresService}
 */
@Injectable()
export class InscriptionService extends InscriptionPostgresService {}
