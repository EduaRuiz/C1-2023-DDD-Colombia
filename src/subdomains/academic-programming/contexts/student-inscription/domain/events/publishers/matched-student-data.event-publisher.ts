import { StudentDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

export abstract class MatchedStudentDataEventPublisher<
  Response = StudentDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.matched-student-data',
      JSON.stringify(this.response),
    );
  }
}
