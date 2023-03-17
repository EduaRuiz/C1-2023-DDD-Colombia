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
   * @param {string} groupId Contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<Entity>} Grupo concreto
   * @memberof IGroupDomainService
   */
  getGroup(groupId: string): Promise<Entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo GroupDomainEntity
   *
   * @param {string} inscriptionId UUID v4 de la inscripción que contiene los grupos
   * @return {Promise<Entity[]>} Lista de grupos asociados a la inscripción
   * @memberof IGroupDomainService
   */
  getAllGroupsByInscription(inscriptionId: string): Promise<Entity[]>;

  /**
   * Método que deberá retornar un array de objetos del tipo GroupDomainEntity
   *
   * @param {string} subjectId UUID v4 de la materia para lista de grupos disponibles
   * @param {string} groupState Estado del grupo que se espera se siempre abierto
   * @return {Promise<Entity[]>} Lista de grupos para inscripción
   * @memberof IGroupDomainService
   */
  getAllGroups(subjectId: string, groupState: string): Promise<Entity[]>;

  /**
   * Método que deberá retornar una confirmación en la suscripción a un grupo
   *
   * @param {string} inscriptionId UUID v4 de la inscripción que se agregará
   * @param {string} group Contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<boolean>} Confirmación del proceso
   * @memberof IGroupDomainService
   */
  subscribeGroup(inscriptionId: string, group: Entity): Promise<Entity>;

  /**
   * Método que deberá retornar una confirmación al darse de baja en un grupo
   *
   * @param {string} inscriptionId UUID v4 de la inscripción que se sacará
   * @param {string} groupId Contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<boolean>} Confirmación del proceso
   * @memberof IGroupDomainService
   */
  unsubscribeGroup(inscriptionId: string, groupId: string): Promise<Entity>;
}
