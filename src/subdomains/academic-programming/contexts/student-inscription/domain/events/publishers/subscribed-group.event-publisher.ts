import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar la inscripcion a un Group
 * Clase absctracta que establece el canal de emision y publica el evento
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
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof SubscribedGroupEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.send(
      'student-inscription.subscribed-group',
      JSON.stringify(this.response),
    );
  }
}
