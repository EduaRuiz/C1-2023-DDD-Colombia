import { StudentDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar realización de la consulta de
 * correspondencia de información de un Student
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class MatchedStudentDataEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class MatchedStudentDataEventPublisher<
  Response = StudentDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof MatchedStudentDataEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-student-data',
      JSON.stringify(this.response),
    );
  }
}
