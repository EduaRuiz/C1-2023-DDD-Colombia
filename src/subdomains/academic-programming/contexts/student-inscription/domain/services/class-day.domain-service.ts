import { ClassDayDomainEntity } from '../entities';

/**
 * Interfaz del servicio ClassDay para el contexto StudentInscription
 *
 * @export
 * @interface IClassDayDomainService
 * @template entity
 */
export interface IClassDayDomainService<
  entity extends ClassDayDomainEntity = ClassDayDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo ClassDayDomainEntity
   *
   * @param {string} classDayId
   * @return {Promise<entity>} Dia de clase concreto
   * @memberof IClassDayDomainService
   */
  getClassDay(classDayId: string): Promise<entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo ClassDayDomainEntity
   *
   * @return {Promise<entity[]>} Lista de días de clase
   * @memberof IClassDayDomainService
   */
  getAllClassDay(): Promise<entity[]>;
}
