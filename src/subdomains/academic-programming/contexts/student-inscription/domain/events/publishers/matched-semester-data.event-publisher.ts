import { SemesterDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar realización de la consulta de
 * correspondencia de información de un Semester
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class MatchedSemesterDataEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class MatchedSemesterDataEventPublisher<
  Response = SemesterDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof MatchedSemesterDataEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-semester-data',
      JSON.stringify(this.response),
    );
  }
}
