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
   * Metodo que deberá retornar un objeto del tipo InscriptionDomainEntity
   *
   * @param {string} inscription
   * @return {*}  {Promise<entity>}
   * @memberof IInscriptionDomainService
   */
  getInscription(inscription: string): Promise<entity>;

  /**
   * Metodo que deberá retornar un array de objetos del tipo InscriptionDomainEntity
   *
   * @return {*}  {Promise<entity[]>}
   * @memberof IInscriptionDomainService
   */
  getAllInscriptions(): Promise<entity[]>;

  /**
   * Metodo que deberar retornar la confirmaciónal cambio del estado de una inscripcion
   * se usara en dado que caso de cancelar o completar una inscripcion
   *
   * @param {entity} inscription
   * @return {*}  {Promise<boolean>}
   * @memberof IInscriptionDomainService
   */
  changeInscriptionState(inscription: entity): Promise<boolean>;

  /**
   * Metodo que debera retornar un objeto del tipo InscriptionDomainEntity
   * se usara para guardar una nueva inscripcion
   *
   * @param {entity} inscription
   * @return {*}  {Promise<entity>}
   * @memberof IInscriptionDomainService
   */
  commitInscription(inscription: entity): Promise<entity>;
}
