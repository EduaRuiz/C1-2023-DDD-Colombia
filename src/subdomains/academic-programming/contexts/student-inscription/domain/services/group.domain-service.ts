import { GroupDomainEntity } from '../entities';

/**
 * Interfaz del servicio Group para el contexto StudentInscription
 *
 * @export
 * @interface IGroupDomainService
 * @template entity
 */
export interface IGroupDomainService<
  entity extends GroupDomainEntity = GroupDomainEntity,
> {
  /**
   * Metodo que deberá retornar un objeto del tipo GroupDomainEntity
   *
   * @param {string} groupId
   * @return {*}  {Promise<entity>}
   * @memberof IGroupDomainService
   */
  getGroup(groupId: string): Promise<entity>;

  /**
   * Medoto que debera retornar un array de objetos del tipo GroupDomainEntity
   *
   * @return {*}  {Promise<entity[]>}
   * @memberof IGroupDomainService
   */
  getAllGroups(): Promise<entity[]>;

  /**
   * Metodo que debera retornar una confirmacion en la subscripcion de un grupo
   *
   * @param {string} groupId
   * @return {*}  {Promise<boolean>}
   * @memberof IGroupDomainService
   */
  subscribeGroup(groupId: string): Promise<boolean>;

  /**
   * Metodo que debera retornar una confirmacion al darse de baja en un grupo
   *
   * @param {string} groupId
   * @return {*}  {Promise<boolean>}
   * @memberof IGroupDomainService
   */
  unsubscribeGroup(groupId: string): Promise<boolean>;
}
