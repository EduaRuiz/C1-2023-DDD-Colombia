import { ClassDayDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

export abstract class MatchedClassDayDataEventPublisher<
  Response = ClassDayDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-class-day-data',
      JSON.stringify(this.response),
    );
  }
}
