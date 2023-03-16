import { InscriptionPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InscriptionService extends InscriptionPostgresService {}
