import { InscriptionDomainEntity } from '../../entities/inscription.domain-entity';

/**
 * Resultado al actualizar estado de inscripcion
 *
 * @export
 * @interface IUpdatedInscriptionStateResponse
 */
export interface IUpdatedInscriptionStateResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IUpdatedInscriptionStateResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {InscriptionDomainEntity}
   * @memberof IUpdatedInscriptionStateResponse
   */
  data: InscriptionDomainEntity;
}
