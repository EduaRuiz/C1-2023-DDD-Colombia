import { InscriptionDomainEntity } from '../entities';

/**
 * Interfaz del servicio Inscription para el contexto StudentInscription
 *
 * @export
 * @interface IInscriptionDomainService
 * @template entity
 */
export interface IInscriptionDomainService<
  entity extends InscriptionDomainEntity = InscriptionDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo InscriptionDomainEntity
   *
   * @param {string} inscription
   * @return {Promise<entity>} Inscripción concreta
   * @memberof IInscriptionDomainService
   */
  getInscription(inscription: string): Promise<entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo InscriptionDomainEntity
   *
   * @return {Promise<entity[]>} Lista de inscripciones
   * @memberof IInscriptionDomainService
   */
  getAllInscriptions(): Promise<entity[]>;

  /**
   * Método que deberá retornar la confirmación al cambio del estado de una inscripción
   * se usara en dado que caso de cancelar o completar una inscripción
   *
   * @param {entity} inscription
   * @return {Promise<boolean>} Confirmación del proceso
   * @memberof IInscriptionDomainService
   */
  changeInscriptionState(inscription: entity): Promise<boolean>;

  /**
   * Método que deberá retornar un objeto del tipo InscriptionDomainEntity
   * se usara para guardar una nueva inscripción
   *
   * @param {entity} inscription
   * @return {Promise<entity>} Confirmación del proceso
   * @memberof IInscriptionDomainService
   */
  commitInscription(inscription: entity): Promise<entity>;
}
