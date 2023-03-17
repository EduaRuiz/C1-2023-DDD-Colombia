import { Injectable } from '@nestjs/common';
import { InscriptionPostgresRepository } from '../repositories';
import { InscriptionPostgresEntity } from '../entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';

@Injectable()
export class InscriptionPostgresService
  implements IInscriptionDomainService<InscriptionPostgresEntity>
{
  constructor(
    private readonly inscriptionPostgresRepository: InscriptionPostgresRepository,
  ) {}
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
  commitInscription(
    inscription: InscriptionPostgresEntity,
  ): Promise<InscriptionPostgresEntity> {
    return this.inscriptionPostgresRepository.create(inscription);
  }
}
