import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PersistenceModule {}
