import { GotSemesterInfoEventPublisher } from '@contexts/student-inscription/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { SemesterEntity } from '../../persistence/entities';

@Injectable()
export class GotSemesterInfoPublisher extends GotSemesterInfoEventPublisher<SemesterEntity> {
  constructor(
    @Inject('INSCRIPTION_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }
  emit<Result = any, Input = SemesterEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
