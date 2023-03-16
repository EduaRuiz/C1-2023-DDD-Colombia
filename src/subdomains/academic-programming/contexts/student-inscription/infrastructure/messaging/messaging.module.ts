import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  CommittedInscriptionPublisher,
  GotGroupInfoPublisher,
  GotInscriptionInfoPublisher,
  GotSemesterInfoPublisher,
  GotStudentInfoPublisher,
  SubscribedGroupPublisher,
} from './publishers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSCRIPTION_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'inscription_context',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'inscription_consumer_1',
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    CommittedInscriptionPublisher,
    GotInscriptionInfoPublisher,
    GotGroupInfoPublisher,
    GotStudentInfoPublisher,
    GotSemesterInfoPublisher,
    SubscribedGroupPublisher,
  ],
  exports: [
    CommittedInscriptionPublisher,
    GotInscriptionInfoPublisher,
    GotGroupInfoPublisher,
    GotStudentInfoPublisher,
    GotSemesterInfoPublisher,
    SubscribedGroupPublisher,
  ],
})
export class MessagingModule {}
