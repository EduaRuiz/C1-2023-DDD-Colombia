import { SemesterDomainEntity } from '../entities';

/**
 * Interfaz del servicio Semester para el contexto StudentInscription
 *
 * @export
 * @interface ISemesterDomainService
 * @template Entity
 */
export interface ISemesterDomainService<
  Entity extends SemesterDomainEntity = SemesterDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo SemesterDomainEntity
   *
   * @param {string} semesterId
   * @return {Promise<Entity>} Semestre concreto
   * @memberof ISemesterDomainService
   */
  getSemester(semesterId: string): Promise<Entity>;
}
