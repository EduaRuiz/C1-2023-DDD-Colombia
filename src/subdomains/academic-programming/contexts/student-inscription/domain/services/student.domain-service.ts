import { StudentDomainEntity } from '../entities';

/**
 * Interfaz del servicio Student para el contexto StudentInscription
 *
 * @export
 * @interface IStudentDomainService
 * @template Entity
 */
export interface IStudentDomainService<
  Entity extends StudentDomainEntity = StudentDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo StudentDomainEntity
   *
   * @param {string} studentId UUID v4 que contiene la información y estructura suficientes y necesarios para realizar la acción
   * @return {Promise<Entity>} EStudiante concreto
   * @memberof IStudentDomainService
   */
  getStudent(studentId: string): Promise<Entity>;
}
