import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ChangedInscriptionStatePublisher,
  CommittedInscriptionPublisher,
  GotGroupInfoPublisher,
  GotGroupsPublisher,
  GotInscriptionInfoPublisher,
  GotInscriptionsPublisher,
  GotSemesterInfoPublisher,
  GotStudentInfoPublisher,
  SubscribedGroupPublisher,
  UnsubscribedGroupPublisher,
} from './publishers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSCRIPTION_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            // clientId: 'inscription_context',
            brokers: ['localhost:9092'],
            // retry: {
            //   initialRetryTime: 3,
            //   retries: 10,
            // },
          },
          // consumer: {
          //   groupId: 'inscription_consumer_1',
          // },
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
    GotGroupsPublisher,
    UnsubscribedGroupPublisher,
    ChangedInscriptionStatePublisher,
    GotInscriptionsPublisher,
  ],
  exports: [
    CommittedInscriptionPublisher,
    GotInscriptionInfoPublisher,
    GotGroupInfoPublisher,
    GotStudentInfoPublisher,
    GotSemesterInfoPublisher,
    SubscribedGroupPublisher,
    GotGroupsPublisher,
    UnsubscribedGroupPublisher,
    ChangedInscriptionStatePublisher,
    GotInscriptionsPublisher,
  ],
})
export class MessagingModule {}
