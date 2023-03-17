import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres/postgres.module';
import {
  GroupService,
  InscriptionService,
  SemesterService,
  StudentService,
} from './services';

/**
 * Modulo de persistencia
 *
 * @export
 * @class PersistenceModule
 */
@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [
    InscriptionService,
    GroupService,
    SemesterService,
    StudentService,
  ],
  exports: [InscriptionService, GroupService, SemesterService, StudentService],
})
export class PersistenceModule {}
