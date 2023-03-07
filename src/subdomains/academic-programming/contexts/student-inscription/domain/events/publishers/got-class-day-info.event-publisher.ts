import { EventPublisherBase } from '@sofka/bases';
import { ClassDayDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la obtencion de informacion de un ClassDay
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
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotClassDayEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-class-day-info',
      JSON.stringify(this.response),
    );
  }
}
