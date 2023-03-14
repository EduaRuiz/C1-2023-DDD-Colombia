import {
  IUpdateInscriptionStateCommand,
  IUpdateInscriptionStateResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectErrorHandler } from '@sofka/bases';
import { IUseCase } from '@sofka/interfaces';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { Topic } from '@contexts/student-inscription/domain';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ChangedInscriptionStateEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import {
  InscriptionIdValueObject,
  InscriptionStateValueObject,
} from '@contexts/student-inscription/domain/value-objects/inscription';
import { ValueObjectException } from '@sofka/exceptions';

export class UpdateInscriptionState
  extends ValueObjectErrorHandler
  implements
    IUseCase<IUpdateInscriptionStateCommand, IUpdateInscriptionStateResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;
  constructor(
    private readonly changedInscriptionStateEventPublisher: ChangedInscriptionStateEventPublisher,
    private readonly inscription$: IInscriptionDomainService,
  ) {
    super();
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      events: new Map([
        [
          Topic.ChangedInscriptionState,
          this.changedInscriptionStateEventPublisher,
        ],
      ]),
    });
  }
  async execute(
    command: IUpdateInscriptionStateCommand,
  ): Promise<IUpdateInscriptionStateResponse> {
    const inscriptionId = new InscriptionIdValueObject(command.inscriptionId);
    const inscriptionState = new InscriptionStateValueObject(
      command.inscriptionState,
    );
    if (inscriptionState.hasErrors())
      this.setErrors(inscriptionState.getErrors());
    if (inscriptionId.hasErrors()) this.setErrors(inscriptionId.getErrors());
    if (this.hasErrors()) {
      new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
    const inscription = await this.inscription$.getInscription(
      command.inscriptionId,
    );
    if (inscription.inscriptionState === inscriptionState) {
      return { success: true, data: inscription };
    }

    const data = await this.inscriptionAggregateRoot.changeInscriptionState(
      inscriptionId.valueOf(),
      inscriptionState.valueOf(),
    );
    return { success: data ? true : false, data };
  }
}
