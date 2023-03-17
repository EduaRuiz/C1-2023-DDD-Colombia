import { GroupDomainEntity } from '../../entities';

/**
 * Respuesta al traer grupos para inscripcion
 *
 * @export
 * @interface IGotGroupsForInscriptionResponse
 */
export interface IGotGroupsForInscriptionResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IGotGroupsForInscriptionResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(GroupDomainEntity[] | null)}
   * @memberof IGotGroupsForInscriptionResponse
   */
  data: GroupDomainEntity[] | null;
}
