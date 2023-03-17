import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModule } from './persistence/persistence.module';
import { StudentInscriptionController } from './controllers/student-inscription.controller';
import {
  AggregateRootExceptionFilter,
  NotFoundExceptionFilter,
  ObjectValueExceptionFilter,
} from './utils/exception-filters';
import { HttpModule } from '@nestjs/axios';
import { SubjectIdExistService } from './utils/services';

@Module({
  imports: [HttpModule, PersistenceModule, MessagingModule],
  controllers: [StudentInscriptionController],
  providers: [
    SubjectIdExistService,
    {
      provide: APP_FILTER,
      useClass: ObjectValueExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AggregateRootExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
  exports: [],
})
export class StudentInscriptionModule {}
