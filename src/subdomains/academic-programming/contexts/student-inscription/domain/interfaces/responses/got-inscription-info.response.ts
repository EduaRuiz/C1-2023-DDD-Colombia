import { InscriptionDomainEntity } from '../../entities';

/**
 * Resultado al traer inscripcion
 *
 * @export
 * @interface IGotInscriptionInfoResponse
 */
export interface IGotInscriptionInfoResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IGotInscriptionInfoResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(InscriptionDomainEntity | null)}
   * @memberof IGotInscriptionInfoResponse
   */
  data: InscriptionDomainEntity | null;
}
