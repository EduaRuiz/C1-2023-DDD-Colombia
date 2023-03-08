import { EventPublisherBase } from '@sofka/bases';
import { ClassDayDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la obtención de información de un ClassDay
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotClassDayEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotClassDayEventPublisher<
  Response = ClassDayDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotClassDayEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-class-day-info',
      JSON.stringify(this.response),
    );
  }
}
