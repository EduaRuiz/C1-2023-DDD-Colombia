import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar realización de la consulta de
 * correspondencia de información de un Group
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class MatchedGroupDataEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class MatchedGroupDataEventPublisher<
  Response = GroupDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof MatchedGroupDataEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-group-data',
      JSON.stringify(this.response),
    );
  }
}
