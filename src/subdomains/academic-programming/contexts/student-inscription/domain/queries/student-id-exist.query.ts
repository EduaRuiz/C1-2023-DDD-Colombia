import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

export abstract class StudentIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  query<Result = boolean>(studentId: string): Promise<Result> {
    return this.send(
      'enrollment-student.student-id-exist',
      JSON.stringify({ data: studentId }),
    );
  }
}
