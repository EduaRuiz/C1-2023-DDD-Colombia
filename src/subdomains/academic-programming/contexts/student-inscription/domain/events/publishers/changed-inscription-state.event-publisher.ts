import { EventPublisherBase } from '@sofka/bases/event-publisher.base';
import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

/**
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
   * Publica en el brocker el cambio en cuestion realizado
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
