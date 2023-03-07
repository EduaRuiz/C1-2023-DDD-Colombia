import { InscriptionDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';

/**
 * Publisher encargado de informar la obtenciónde informaciónde una lista de Inscriptions
 * Clase absctracta que establece el canal de emision y publica el evento
 *
 * @export
 * @abstract
 * @class GotInscriptionsEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotInscriptionsEventPublisher<
  Response = InscriptionDomainEntity[],
> extends EventPublisherBase<Response> {
  /**
   * Metodo de publicacióndel evento
   * Publica en el brocker la acciónrealizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotInscriptionsEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-inscriptions',
      JSON.stringify(this.response),
    );
  }
}
