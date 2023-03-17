import { Injectable } from '@nestjs/common';
import {
  GroupPostgresRepository,
  InscriptionPostgresRepository,
} from '../repositories';
import { GroupPostgresEntity } from '../entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';

/**
 * Servicio de grupos
 *
 * @export
 * @class GroupPostgresService
 * @implements {IGroupDomainService<GroupPostgresEntity>}
 */
@Injectable()
export class GroupPostgresService
  implements IGroupDomainService<GroupPostgresEntity>
{
  /**
   * Crea una instancia de GroupPostgresService.
   *
   * @param {GroupPostgresRepository} groupPostgresRepository Repositorio de grupos
   * @param {InscriptionPostgresRepository} inscriptionPostgresRepository Repositorio de inscripciones
   * @memberof GroupPostgresService
   */
  constructor(
    private readonly groupPostgresRepository: GroupPostgresRepository,
    private readonly inscriptionPostgresRepository: InscriptionPostgresRepository,
  ) {}

  /**
   * Retorna grupo
   *
   * @param {string} groupId Id grupo
   * @return {Promise<GroupPostgresEntity>} Grupo
   * @memberof GroupPostgresService
   */
  getGroup(groupId: string): Promise<GroupPostgresEntity> {
    return this.groupPostgresRepository.findOneById(groupId);
  }
  async getAllGroupsByInscription(
    inscriptionId: string,
  ): Promise<GroupPostgresEntity[]> {
    const inscription = await this.inscriptionPostgresRepository.findOneById(
      inscriptionId,
    );
    return inscription.groups;
  }

  /**
   * Retorna todos los grupos según filtro
   *
   * @param {string} subjectId Id materia
   * @param {string} groupState Estado del grupo
   * @return {Promise<GroupPostgresEntity[]>} Lista de grupos
   * @memberof GroupPostgresService
   */
  async getAllGroups(
    subjectId: string,
    groupState: string,
  ): Promise<GroupPostgresEntity[]> {
    const allGroups = await this.groupPostgresRepository.findAll();
    const response: GroupPostgresEntity[] = [];
    for (const group of allGroups) {
      if (group.subjectId === subjectId && group.groupState === groupState) {
        response.push(group);
      }
    }
    return response;
  }

  /**
   * Registra grupo a inscripcion
   *
   * @param {string} inscriptionId Id inscripcion
   * @param {GroupPostgresEntity} group Grupo
   * @return {Promise<GroupPostgresEntity>} Grupo
   * @memberof GroupPostgresService
   */
  async subscribeGroup(
    inscriptionId: string,
    group: GroupPostgresEntity,
  ): Promise<GroupPostgresEntity> {
    const inscription = await this.inscriptionPostgresRepository.findOneById(
      inscriptionId,
    );
    inscription.groups.push(group);
    this.inscriptionPostgresRepository.update(inscriptionId, inscription);
    return group;
  }

  /**
   * Dada de baja de un grupo en una inscripcion
   *
   * @param {string} inscriptionId Id inscripcion
   * @param {string} groupId Id grupo
   * @return {Promise<GroupPostgresEntity>} Grupo
   * @memberof GroupPostgresService
   */
  async unsubscribeGroup(
    inscriptionId: string,
    groupId: string,
  ): Promise<GroupPostgresEntity> {
    const inscription = await this.inscriptionPostgresRepository.findOneById(
      inscriptionId,
    );
    const currentGroups = inscription.groups;
    inscription.groups = currentGroups.filter(
      (group) => group.groupId != groupId,
    );
    this.inscriptionPostgresRepository.update(inscriptionId, inscription);
    return this.groupPostgresRepository.findOneById(groupId);
  }

  /**
   * Crea grupo
   *
   * @param {GroupPostgresEntity} group Grupo
   * @return {Promise<GroupPostgresEntity>} Grupo creado
   * @memberof GroupPostgresService
   */
  createGroup(group: GroupPostgresEntity): Promise<GroupPostgresEntity> {
    return this.groupPostgresRepository.create(group);
  }
}
