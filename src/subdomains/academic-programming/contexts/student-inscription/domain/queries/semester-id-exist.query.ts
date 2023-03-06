import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

export abstract class SemesterIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  query<Result = boolean>(semesterId: string): Promise<Result> {
    return this.send(
      'semester-definition.semester-id-exist',
      JSON.stringify({ data: semesterId }),
    );
  }
}
