import { InscriptionDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de una lista de Inscriptions
 * Clase abstracta que establece el canal de emisión y publica el evento
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
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotInscriptionsEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotInscriptions, JSON.stringify(this.response));
  }
}
