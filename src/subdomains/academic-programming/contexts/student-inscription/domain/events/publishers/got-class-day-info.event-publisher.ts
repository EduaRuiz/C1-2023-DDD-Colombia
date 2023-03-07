import { EventPublisherBase } from '@sofka/bases';
import { ClassDayDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la obtenciónde informaciónde un ClassDay
 * Clase absctracta que establece el canal de emision y publica el evento
 *
 * @export
 * @abstract
 * @class GotClassDayEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotClassDayEventPublisher<
  Response = ClassDayDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Retorna
   * @memberof GotClassDayEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-class-day-info',
      JSON.stringify(this.response),
    );
  }
}
