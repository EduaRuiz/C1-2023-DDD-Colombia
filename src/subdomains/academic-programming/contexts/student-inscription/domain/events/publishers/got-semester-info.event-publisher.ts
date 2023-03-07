import { SemesterDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar la obtenciónde informaciónde un Semester
 * Clase absctracta que establece el canal de emision y publica el evento
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
   * Metodo de publicacióndel evento
   * Publica en el brocker la acciónrealizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotSemesterInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-semester-info',
      JSON.stringify(this.response),
    );
  }
}
