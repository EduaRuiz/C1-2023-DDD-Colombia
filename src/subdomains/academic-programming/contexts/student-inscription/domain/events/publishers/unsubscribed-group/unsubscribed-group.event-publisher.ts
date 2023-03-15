import { GroupDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la baja a un Group
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class UnsubscribedGroupEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class UnsubscribedGroupEventPublisher<
  Response = GroupDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof UnsubscribedGroupEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.UnsubscribedGroup, JSON.stringify(this.response));
  }
}
