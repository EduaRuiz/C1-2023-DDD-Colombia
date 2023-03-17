import { Injectable } from '@nestjs/common';
import { InscriptionPostgresRepository } from '../repositories';
import { InscriptionPostgresEntity } from '../entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';

/**
 * Servicio de inscripciones
 *
 * @export
 * @class InscriptionPostgresService
 * @implements {IInscriptionDomainService<InscriptionPostgresEntity>}
 */
@Injectable()
export class InscriptionPostgresService
  implements IInscriptionDomainService<InscriptionPostgresEntity>
{
  /**
   * Crea una entidad de InscriptionPostgresService.
   *
   * @param {InscriptionPostgresRepository} inscriptionPostgresRepository
   * @memberof InscriptionPostgresService
   */
  constructor(
    private readonly inscriptionPostgresRepository: InscriptionPostgresRepository,
  ) {}

  /**
   * Retorna inscripcion
   *
   * @param {string} inscriptionId Id inscripcion
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion buscada
   * @memberof InscriptionPostgresService
   */
  getInscription(inscriptionId: string): Promise<InscriptionPostgresEntity> {
    return this.inscriptionPostgresRepository.findOneById(inscriptionId);
  }
  async getAllInscriptionsByStudent(
    studentId: string,
  ): Promise<InscriptionPostgresEntity[]> {
    const allInscriptions = await this.inscriptionPostgresRepository.findAll();
    const response: InscriptionPostgresEntity[] = [];
    for (const inscription of allInscriptions) {
      if (inscription.student.studentId === studentId) {
        response.push(inscription);
      }
    }
    return response;
  }

  /**
   * Cambia el estado de una inscripcion
   *
   * @param {string} inscriptionId Id inscripcion
   * @param {string} inscriptionState Estado inscripcion
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion actualizada
   * @memberof InscriptionPostgresService
   */
  async changeInscriptionState(
    inscriptionId: string,
    inscriptionState: string,
  ): Promise<InscriptionPostgresEntity> {
    const currentInscription =
      await this.inscriptionPostgresRepository.findOneById(inscriptionId);
    currentInscription.inscriptionState = inscriptionState;
    return this.inscriptionPostgresRepository.update(
      inscriptionId,
      currentInscription,
    );
  }

  /**
   * Crea inscripcion
   *
   * @param {InscriptionPostgresEntity} inscription Inscripcion
   * @return {Promise<InscriptionPostgresEntity>} Inscripcion creada
   * @memberof InscriptionPostgresService
   */
  commitInscription(
    inscription: InscriptionPostgresEntity,
  ): Promise<InscriptionPostgresEntity> {
    return this.inscriptionPostgresRepository.create(inscription);
  }
}
