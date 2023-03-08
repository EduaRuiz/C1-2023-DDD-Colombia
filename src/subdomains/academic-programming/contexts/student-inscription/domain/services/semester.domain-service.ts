import { SemesterDomainEntity } from '../entities';

/**
 * Interfaz del servicio Semester para el contexto StudentInscription
 *
 * @export
 * @interface ISemesterDomainService
 * @template entity
 */
export interface ISemesterDomainService<
  entity extends SemesterDomainEntity = SemesterDomainEntity,
> {
  /**
   * Método que deberá retornar un objeto del tipo SemesterDomainEntity
   *
   * @param {string} semesterId
   * @return {Promise<entity>} Semestre concreto
   * @memberof ISemesterDomainService
   */
  getSemester(semesterId: string): Promise<entity>;
}
