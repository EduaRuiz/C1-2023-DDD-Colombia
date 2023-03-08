import { InscriptionDomainEntity } from '../entities';

/**
 * Interfaz del servicio Inscription para el contexto StudentInscription
 *
 * @export
 * @interface IInscriptionDomainService
 * @template Entity
 */
export interface IInscriptionDomainService<
  Entity extends InscriptionDomainEntity = InscriptionDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo InscriptionDomainEntity
   *
   * @param {string} inscription
   * @return {Promise<Entity>} Inscripción concreta
   * @memberof IInscriptionDomainService
   */
  getInscription(inscription: string): Promise<Entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo InscriptionDomainEntity
   *
   * @return {Promise<Entity[]>} Lista de inscripciones
   * @memberof IInscriptionDomainService
   */
  getAllInscriptions(): Promise<Entity[]>;

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
   * @return {Promise<Entity>} Confirmación del proceso
   * @memberof IInscriptionDomainService
   */
  commitInscription(inscription: entity): Promise<Entity>;
}
