import { EventPublisherBase } from '@sofka/bases';
import { InscriptionDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la obtención de información de un ClassDay
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class ChangedInscriptionStateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedInscriptionStateEventPublisher<
  Response = InscriptionDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result Tipo de respuesta
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof ChangedInscriptionStateEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.changed-inscription-state',
      JSON.stringify(this.response),
    );
  }
}
