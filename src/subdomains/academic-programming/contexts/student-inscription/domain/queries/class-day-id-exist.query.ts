import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

export abstract class ClassDayIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  query<Result = boolean>(classDayId: string): Promise<Result> {
    return this.send(
      'academic-offer.class-day-id-exist',
      JSON.stringify({ data: classDayId }),
    );
  }
}
