import { GroupDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la inscripción a un Group
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class SubscribedGroupEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class SubscribedGroupEventPublisher<
  Response = GroupDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof SubscribedGroupEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.SubscribedGroup, JSON.stringify(this.response));
  }
}
