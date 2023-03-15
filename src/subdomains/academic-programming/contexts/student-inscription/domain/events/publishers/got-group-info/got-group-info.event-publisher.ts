import { GroupDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de un Group
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotGroupInfoEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotGroupInfoEventPublisher<
  Response = GroupDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotGroupInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotGroupInfo, JSON.stringify(this.response));
  }
}
