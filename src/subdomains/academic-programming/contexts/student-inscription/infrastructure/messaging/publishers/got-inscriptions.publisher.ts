import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { InscriptionEntity } from '../../persistence';
import { GotInscriptionsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';

/**
 * Publicador de la obtención de un listado de inscripciones
 *
 * @export
 * @class GotInscriptionsPublisher
 * @extends {GotInscriptionsEventPublisher<InscriptionEntity[]>}
 */
@Injectable()
export class GotInscriptionsPublisher extends GotInscriptionsEventPublisher<
  InscriptionEntity[]
> {
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
  emit<Result = any, Input = InscriptionEntity[]>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
