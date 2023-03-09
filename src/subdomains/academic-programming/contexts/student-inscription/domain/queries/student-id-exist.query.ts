import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

/**
 * Valida si existe el ID suministrado
 *
 * @export
 * @abstract
 * @class StudentIdExistQuery
 * @extends {EntityExistQueryBase<Response>}
 * @template Response Tipo de respuesta
 */
export abstract class StudentIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  /**
   *
   *
   * @template Result
   * @param {string} studentId Valor a consultar UUID v4
   * @return {Promise<Result>} Retorno de la consulta, puede ser ana entidad del tipo enviado o un booleano
   * @memberof StudentIdExistQuery
   */
  query<Result = boolean>(studentId: string): Promise<Result> {
    return this.send(
      'enrollment-student.student-id-exist',
      JSON.stringify({ data: studentId }),
    );
  }
}
