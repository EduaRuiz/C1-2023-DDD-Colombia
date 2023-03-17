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
import { JwtStrategy } from './utils/strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule,
    PersistenceModule,
    MessagingModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [StudentInscriptionController],
  providers: [
    JwtStrategy,
    SubjectIdExistService,
    JwtModule,
    JwtService,
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
  exports: [JwtStrategy, JwtModule, JwtService, PassportModule],
})
export class StudentInscriptionModule {}
