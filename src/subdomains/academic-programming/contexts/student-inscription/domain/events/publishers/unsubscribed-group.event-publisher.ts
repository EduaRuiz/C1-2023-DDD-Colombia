import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar la baja a un Group
 * Clase absctracta que establece el canal de emision y publica el evento
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
   * Metodo de publicacióndel evento
   * Publica en el brocker la acciónrealizada
   *
   * @template Result
   * @return {Promise<Result>} Informacióndel brocker
   * @memberof UnsubscribedGroupEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.unsubscribed-group',
      JSON.stringify(this.response),
    );
  }
}
