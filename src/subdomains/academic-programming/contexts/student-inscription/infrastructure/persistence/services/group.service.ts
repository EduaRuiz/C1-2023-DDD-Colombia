import { GroupPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService extends GroupPostgresService {}
