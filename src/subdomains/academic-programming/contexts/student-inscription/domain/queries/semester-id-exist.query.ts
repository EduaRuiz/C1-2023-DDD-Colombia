import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

/**
 * Valida si existe el ID suministrado
 *
 * @export
 * @abstract
 * @class SemesterIdExistQuery
 * @extends {EntityExistQueryBase<Response>}
 * @template Response Tipo de respuesta
 */
export abstract class SemesterIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  /**
   *
   *
   * @template Result
   * @param {string} semesterId Valor a consultar UUID v4
   * @return {Promise<Result>} Retorno de la consulta, puede ser ana entidad del tipo enviado o un booleano
   * @memberof SemesterIdExistQuery
   */
  query<Result = boolean>(semesterId: string): Promise<Result> {
    return this.send(
      'semester-definition.semester-id-exist',
      JSON.stringify({ data: semesterId }),
    );
  }
}
