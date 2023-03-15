import { StudentDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de un Student
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotStudentInfoEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotStudentInfoEventPublisher<
  Response = StudentDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotStudentInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotStudentInfo, JSON.stringify(this.response));
  }
}
