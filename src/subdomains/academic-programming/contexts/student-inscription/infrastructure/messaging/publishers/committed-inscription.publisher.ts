import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { CommittedInscriptionEventPublisher } from '../../../domain/events/publishers/committed-inscription/committed-inscription.event-publisher';
import { InscriptionEntity } from '../../persistence';

/**
 * Publica la creación de una inscripcion
 *
 * @export
 * @class CommittedInscriptionPublisher
 * @extends {CommittedInscriptionEventPublisher<InscriptionEntity>}
 */
@Injectable()
export class CommittedInscriptionPublisher extends CommittedInscriptionEventPublisher<InscriptionEntity> {
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
  emit<Result = any, Input = InscriptionEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
