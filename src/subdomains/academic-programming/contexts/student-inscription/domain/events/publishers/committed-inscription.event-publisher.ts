import { EventPublisherBase } from '@sofka/bases';
import { InscriptionDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la generación de una nueva Inscription
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class CommittedInscriptionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class CommittedInscriptionEventPublisher<
  Response = InscriptionDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof CommittedInscriptionEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.committed-inscription',
      JSON.stringify(this.response),
    );
  }
}
