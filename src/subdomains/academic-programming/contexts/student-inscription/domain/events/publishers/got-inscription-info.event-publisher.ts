import { InscriptionDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';

/**
 * Publisher encargado de informar la obtencion de informacion de un Inscription
 * Clase absctracta que establece el canal de emision y publica el evento
 *
 * @export
 * @abstract
 * @class GotInscriptionInfoEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotInscriptionInfoEventPublisher<
  Response = InscriptionDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotInscriptionInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-inscription-info',
      JSON.stringify(this.response),
    );
  }
}
