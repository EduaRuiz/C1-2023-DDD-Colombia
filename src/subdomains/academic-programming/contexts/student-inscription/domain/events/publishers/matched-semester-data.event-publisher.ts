import { SemesterDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

export abstract class MatchedSemesterDataEventPublisher<
  Response = SemesterDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-semester-data',
      JSON.stringify(this.response),
    );
  }
}
