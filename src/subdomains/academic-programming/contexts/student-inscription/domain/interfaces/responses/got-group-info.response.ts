import { GroupDomainEntity } from '../../entities';

/**
 * Respuesta al traer un grupo
 *
 * @export
 * @interface IGotGroupInfoResponse
 */
export interface IGotGroupInfoResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IGotGroupInfoResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(GroupDomainEntity | null)}
   * @memberof IGotGroupInfoResponse
   */
  data: GroupDomainEntity | null;
}
