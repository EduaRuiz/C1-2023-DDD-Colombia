import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { InscriptionEntity } from '../../persistence/entities';
import { GotInscriptionInfoEventPublisher } from '../../../domain/events/publishers/got-inscription-info/got-inscription-info.event-publisher';

@Injectable()
export class GotInscriptionInfoPublisher extends GotInscriptionInfoEventPublisher<InscriptionEntity> {
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
