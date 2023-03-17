import { GroupDomainEntity } from '../../entities';

/**
 * Respuesta al agregar un grupo a una inscripcion
 *
 * @export
 * @interface IAddedGroupResponse
 */
export interface IAddedGroupResponse {
  /**
   * Confirmación del resultado
   *
   * @type {boolean}
   * @memberof IAddedGroupResponse
   */
  success: boolean;
  /**
   * Información del resultado
   *
   * @type {(GroupDomainEntity | null)}
   * @memberof IAddedGroupResponse
   */
  data: GroupDomainEntity | null;
}
