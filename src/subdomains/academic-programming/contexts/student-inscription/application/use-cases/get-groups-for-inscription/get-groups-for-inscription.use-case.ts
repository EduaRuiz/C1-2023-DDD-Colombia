import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import { IGetGroupsForInscriptionCommand } from '../../../domain/interfaces/commands/get-groups-for-inscription.command';
import { IGotGroupsForInscriptionResponse } from '../../../domain/interfaces/responses/got-groups-for-inscription.response';

import {
  GotGroupsEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';

export class GetGroupsForInscriptionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IGetGroupsForInscriptionCommand, IGotGroupsForInscriptionResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  constructor(
    private readonly gotGroupsEventPublisher: GotGroupsEventPublisher,
    private readonly group$: IGroupDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      group$,
      events: new Map([[Topic.GotGroups, this.gotGroupsEventPublisher]]),
    });
  }

  async execute(
    command: IGetGroupsForInscriptionCommand,
  ): Promise<IGotGroupsForInscriptionResponse> {
    const semesterId = new GroupIdValueObject(command.semesterId);
    const subjectId = new GroupIdValueObject(command.subjectId);
    if (semesterId.hasErrors()) this.setErrors(semesterId.getErrors());
    if (subjectId.hasErrors()) this.setErrors(subjectId.getErrors());
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
    const data = await this.inscriptionAggregateRoot.getAllGroups(
      subjectId.valueOf(),
      semesterId.valueOf(),
    );
    return { success: true, data };
  }
}
