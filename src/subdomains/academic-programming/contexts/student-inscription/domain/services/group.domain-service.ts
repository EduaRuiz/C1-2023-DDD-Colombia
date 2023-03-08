import { GroupDomainEntity } from '../entities';

/**
 * Interfaz del servicio Group para el contexto StudentInscription
 *
 * @export
 * @interface IGroupDomainService
 * @template Entity
 */
export interface IGroupDomainService<
  Entity extends GroupDomainEntity = GroupDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo GroupDomainEntity
   *
   * @param {string} groupId
   * @return {Promise<Entity>} Grupo concreto
   * @memberof IGroupDomainService
   */
  getGroup(groupId: string): Promise<Entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo GroupDomainEntity
   *
   * @param {string} inscriptionId UUID v4 de la inscripción que contiene los grupos
   * @return {Promise<Entity[]>} Lista de grupos
   * @memberof IGroupDomainService
   */
  getAllGroups(inscriptionId: string): Promise<Entity[]>;

  /**
   * Método que deberá retornar una confirmación en la suscripción a un grupo
   *
   * @param {string} groupId
   * @return {Promise<boolean>} Confirmación del proceso
   * @memberof IGroupDomainService
   */
  subscribeGroup(group: Entity): Promise<Entity>;

  /**
   * Método que deberá retornar una confirmación al darse de baja en un grupo
   *
   * @param {string} groupId
   * @return {Promise<boolean>} Confirmación del proceso
   * @memberof IGroupDomainService
   */
  unsubscribeGroup(groupId: string): Promise<Entity>;
}
