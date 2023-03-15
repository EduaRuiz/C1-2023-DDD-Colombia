import { SemesterDomainEntity } from '../../../entities';
import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../enums/topic.enum';

/**
 * Publisher encargado de informar la obtención de información de un Semester
 * Clase abstracta que establece el canal de emisión y publica el evento
 *
 * @export
 * @abstract
 * @class GotSemesterInfoEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotSemesterInfoEventPublisher<
  Response = SemesterDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Método de publicación del evento
   * Publica en el Broker la acción realizada
   *
   * @template Result
   * @return {Promise<Result>} Respuesta del Broker luego de la publicación
   * @memberof GotSemesterInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Topic.GotSemesterInfo, JSON.stringify(this.response));
  }
}
