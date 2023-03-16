import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { GroupEntity } from '../../persistence';
import { GotGroupInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';

@Injectable()
export class GotGroupInfoPublisher extends GotGroupInfoEventPublisher<GroupEntity> {
  constructor(
    @Inject('INSCRIPTION_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }
  emit<Result = any, Input = GroupEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
