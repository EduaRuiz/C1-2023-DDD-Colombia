import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

export abstract class GroupIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  query<Result = boolean>(groupId: string): Promise<Result> {
    return this.send(
      'academic-offer.group-id-exist',
      JSON.stringify({ data: groupId }),
    );
  }
}
