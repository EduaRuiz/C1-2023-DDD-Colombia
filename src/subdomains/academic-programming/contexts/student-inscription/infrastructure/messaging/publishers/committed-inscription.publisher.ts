import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { CommittedInscriptionEventPublisher } from '../../../domain/events/publishers/committed-inscription/committed-inscription.event-publisher';
import { InscriptionEntity } from '../../persistence';

@Injectable()
export class CommittedInscriptionPublisher extends CommittedInscriptionEventPublisher<InscriptionEntity> {
  constructor(
    @Inject('INSCRIPTION_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }
  emit<Result = any, Input = InscriptionEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
