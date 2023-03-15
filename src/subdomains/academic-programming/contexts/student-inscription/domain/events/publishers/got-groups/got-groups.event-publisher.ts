import { GroupDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de una lista de Groups
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotGroupsEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotGroupsEventPublisher<
  Response = GroupDomainEntity[],
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotGroupsEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotGroups, JSON.stringify(this.response));
  }
}
