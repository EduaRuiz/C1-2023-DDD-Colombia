import { Injectable } from '@nestjs/common';
import {
  GroupPostgresRepository,
  InscriptionPostgresRepository,
} from '../repositories';
import { GroupPostgresEntity } from '../entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';

@Injectable()
export class GroupPostgresService
  implements IGroupDomainService<GroupPostgresEntity>
{
  constructor(
    private readonly groupPostgresRepository: GroupPostgresRepository,
    private readonly inscriptionPostgresRepository: InscriptionPostgresRepository,
  ) {}
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

  createGroup(group: GroupPostgresEntity) {
    return this.groupPostgresRepository.create(group);
  }
}
