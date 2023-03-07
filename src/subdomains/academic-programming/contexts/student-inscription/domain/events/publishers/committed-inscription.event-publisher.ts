import { EventPublisherBase } from '@sofka/bases';
import { InscriptionDomainEntity } from '../../entities';

/**
 * Publisher encargado de informar la generacion de una nueva Inscription
 * Clase absctracta que establece el canal de emision y publica el evento
 *
 * @export
 * @abstract
 * @class CommittedInscriptionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class CommittedInscriptionEventPublisher<
  Response = InscriptionDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Metodo de publicacion del evento
   * Publica en el brocker la accion realizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof CommittedInscriptionEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.committed-inscription',
      JSON.stringify(this.response),
    );
  }
}
