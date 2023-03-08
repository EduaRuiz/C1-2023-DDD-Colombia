import { StudentDomainEntity } from '../entities';

/**
 * Interfaz del servicio Student para el contexto StudentInscription
 *
 * @export
 * @interface IStudentDomainService
 * @template entity
 */
export interface IStudentDomainService<
  entity extends StudentDomainEntity = StudentDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo StudentDomainEntity
   *
   * @param {string} studentId
   * @return {Promise<entity>} EStudiante concreto
   * @memberof IStudentDomainService
   */
  getStudent(studentId: string): Promise<entity>;
}
