import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { GroupEntity } from '../../persistence/entities';

/**
 * Publica la suscripción de un grupo a una inscripcion
 *
 * @export
 * @class SubscribedGroupPublisher
 * @extends {SubscribedGroupEventPublisher<GroupEntity>}
 */
@Injectable()
export class SubscribedGroupPublisher extends SubscribedGroupEventPublisher<GroupEntity> {
  constructor(
    @Inject('INSCRIPTION_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }
  /**
   * Emite el mensaje en el broker
   *
   * @template Result Resultado
   * @template Input Entrada
   * @param {*} pattern Patron
   * @param {Input} data Información publicada
   * @return {Promise<Result>} Resultado
   * @memberof ChangedInscriptionStatePublisher
   */
  emit<Result = any, Input = GroupEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
