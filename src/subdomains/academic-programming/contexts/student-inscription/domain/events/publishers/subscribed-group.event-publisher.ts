import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar la inscripcióna un Group
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
   * Metodo de publicacióndel evento
   * Publica en el brocker la acciónrealizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof SubscribedGroupEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.subscribed-group',
      JSON.stringify(this.response),
    );
  }
}
