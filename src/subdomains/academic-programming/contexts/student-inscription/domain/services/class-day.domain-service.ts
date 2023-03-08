import { ClassDayDomainEntity } from '../entities';

/**
 * Interfaz del servicio ClassDay para el contexto StudentInscription
 *
 * @export
 * @interface IClassDayDomainService
 * @template Entity
 */
export interface IClassDayDomainService<
  Entity extends ClassDayDomainEntity = ClassDayDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo ClassDayDomainEntity
   *
   * @param {string} classDayId UUID v4 que contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<Entity>} Dia de clase concreto
   * @memberof IClassDayDomainService
   */
  getClassDay(classDayId: string): Promise<Entity>;

  /**
   * Método que deberá retornar un array de objetos del tipo ClassDayDomainEntity
   *
   * @param {string} groupId UUID v4 que contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<Entity[]>} Lista de días de clase
   * @memberof IClassDayDomainService
   */
  getAllClassDays(groupId: string): Promise<Entity[]>;
}
