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
   * Metodo que deberá retornar un objeto del tipo ClassDayDomainEntity
   *
   * @param {string} classDayId
   * @return {*}  {Promise<entity>}
   * @memberof IClassDayDomainService
   */
  getClassDay(classDayId: string): Promise<entity>;

  /**
   * Medoto que debera retornar un array de objetos del tipo ClassDayDomainEntity
   *
   * @return {*}  {Promise<entity[]>}
   * @memberof IClassDayDomainService
   */
  getAllClassDay(): Promise<entity[]>;
}
