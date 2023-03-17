import { GroupPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

/**
 * Servicio de grupos
 *
 * @export
 * @class GroupService
 * @extends {GroupPostgresService}
 */
@Injectable()
export class GroupService extends GroupPostgresService {}
