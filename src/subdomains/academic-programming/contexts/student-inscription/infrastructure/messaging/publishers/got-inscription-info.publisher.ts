import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { InscriptionEntity } from '../../persistence/entities';
import { GotInscriptionInfoEventPublisher } from '../../../domain/events/publishers/got-inscription-info/got-inscription-info.event-publisher';

/**
 * Publica la obtención de la información de una inscripcion
 *
 * @export
 * @class GotInscriptionInfoPublisher
 * @extends {GotInscriptionInfoEventPublisher<InscriptionEntity>}
 */
@Injectable()
export class GotInscriptionInfoPublisher extends GotInscriptionInfoEventPublisher<InscriptionEntity> {
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
