import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

/**
 * Respuesta al generar una inscripcion
 *
 * @export
 * @interface ICommittedInscriptionResponse
 */
export interface ICommittedInscriptionResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof ICommittedInscriptionResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(InscriptionDomainEntity | null)}
   * @memberof ICommittedInscriptionResponse
   */
  data: InscriptionDomainEntity | null;
}
