import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka/interfaces';
import { lastValueFrom } from 'rxjs';
import { ClassDayEntity } from '../../persistence';
import { GotClassDayInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';

/**
 * Publica la obtención de un ClassDay
 *
 * @export
 * @class GotClassDayInfoPublisher
 * @extends {GotClassDayInfoEventPublisher<ClassDayEntity>}
 */
@Injectable()
export class GotClassDayInfoPublisher extends GotClassDayInfoEventPublisher<ClassDayEntity> {
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
  emit<Result = any, Input = ClassDayEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
