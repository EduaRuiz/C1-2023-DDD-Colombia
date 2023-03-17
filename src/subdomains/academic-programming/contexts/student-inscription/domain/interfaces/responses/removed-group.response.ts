import { GroupDomainEntity } from '../../entities';

/**
 * REsultado al remover un grupo de una inscripcion
 *
 * @export
 * @interface IRemovedGroupResponse
 */
export interface IRemovedGroupResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IRemovedGroupResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(GroupDomainEntity | null)}
   * @memberof IRemovedGroupResponse
   */
  data: GroupDomainEntity | null;
}
