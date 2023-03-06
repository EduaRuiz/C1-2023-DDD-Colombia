import { EventPublisherBase } from '@sofka/bases';

export abstract class EntityExistQueryBase<
  Response,
> extends EventPublisherBase<Response> {
  abstract query<Result = any>(...args: string[]): Promise<Result>;
}
