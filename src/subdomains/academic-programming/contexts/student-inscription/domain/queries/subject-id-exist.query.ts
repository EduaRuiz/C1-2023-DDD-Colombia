import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

/**
 * Valida si existe el ID suministrado
 *
 * @export
 * @abstract
 * @class SubjectIdExistQuery
 * @extends {EntityExistQueryBase<Response>}
 * @template Response Tipo de respuesta
 */
export abstract class SubjectIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  /**
   *
   *
   * @template Result
   * @param {string} subjectId Valor a consultar UUID v4
   * @return {Promise<Result>} Retorno de la consulta, puede ser ana entidad del tipo enviado o un booleano
   * @memberof SubjectIdExistQuery
   */
  query<Result = boolean>(subjectId: string): Promise<Result> {
    return this.send(
      'academic-offer.subject-id-exist',
      JSON.stringify({ data: subjectId }),
    );
  }
}
