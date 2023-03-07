import { GroupDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

export abstract class MatchedGroupDataEventPublisher<
  Response = GroupDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-group-data',
      JSON.stringify(this.response),
    );
  }
}
