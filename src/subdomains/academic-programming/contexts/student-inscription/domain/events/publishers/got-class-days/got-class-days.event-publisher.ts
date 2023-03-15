import { EventPublisherBase } from '@sofka/bases';
import { ClassDayDomainEntity } from '../../../entities';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de un ClassDay
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotClassDaysEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotClassDaysEventPublisher<
  Response = ClassDayDomainEntity[],
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotClassDaysEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotClassDays, JSON.stringify(this.response));
  }
}
