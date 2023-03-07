import { EventPublisherBase } from '@sofka/bases';
import { InscriptionDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la optencion de informacion de un ClassDay
 * Clase absctracta que establece el canal de emision y publica el evento
 *
 * @export
 * @abstract
 * @class ChangedInscriptionStateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedInscriptionStateEventPublisher<
  Response = InscriptionDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof ChangedInscriptionStateEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.changed-inscription-state',
      JSON.stringify(this.response),
    );
  }
}
