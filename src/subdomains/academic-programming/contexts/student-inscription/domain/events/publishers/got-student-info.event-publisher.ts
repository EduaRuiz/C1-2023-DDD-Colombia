import { StudentDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

/**
 * Publisher encargado de informar la obtenciónde informaciónde un Student
 * Clase absctracta que establece el canal de emision y publica el evento
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
   * Metodo de publicacióndel evento
   * Publica en el brocker la acciónrealizada
   *
   * @template Result
   * @return {*}  {Promise<Result>}
   * @memberof GotStudentInfoEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-student-info',
      JSON.stringify(this.response),
    );
  }
}
