import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import {
  GotInscriptionInfoEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';
import { IGetInscriptionInfoCommand } from '@contexts/student-inscription/domain/interfaces/commands';
import { IGotInscriptionInfoResponse } from '@contexts/student-inscription/domain/interfaces/responses';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';

export class GetInscriptionInfoUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetInscriptionInfoCommand, IGotInscriptionInfoResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  constructor(
    private readonly gotInscriptionInfoEventPublisher: GotInscriptionInfoEventPublisher,
    private readonly inscription$: IInscriptionDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      events: new Map([
        [Topic.GotInscriptionInfo, this.gotInscriptionInfoEventPublisher],
      ]),
    });
  }
  async execute(
    command: IGetInscriptionInfoCommand,
  ): Promise<IGotInscriptionInfoResponse> {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    if (inscriptionId.hasErrors()) this.setErrors(inscriptionId.getErrors());
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
    const data = await this.inscriptionAggregateRoot.getInscription(
      inscriptionId.valueOf(),
    );
    return { success: true, data };
  }
}
