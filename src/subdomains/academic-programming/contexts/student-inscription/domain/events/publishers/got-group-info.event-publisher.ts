import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases/event-publisher.base';

/**
 * Publisher encargado de informar la obtencion de informacion de un Group
 * Clase absctracta que establece el canal de emision y publica el evento
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
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotGroupInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-group-info',
      JSON.stringify(this.response),
    );
  }
}
