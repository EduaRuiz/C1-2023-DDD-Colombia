import { SemesterDomainEntity } from '../../entities';
import { EventPublisherBase } from '@sofka/bases';

export abstract class GotSemesterInfoEventPublisher<
  Response = SemesterDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'student-inscription.got-semester-info',
      JSON.stringify(this.response),
    );
  }
}
