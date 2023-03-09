import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

/**
 * Valida si existe el ID suministrado
 *
 * @export
 * @abstract
 * @class GroupIdExistQuery
 * @extends {EntityExistQueryBase<Response>}
 * @template Response Tipo de respuesta
 */
export abstract class GroupIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  /**
   * Método que corre la consulta y establece el canal en el Broker
   *
   * @template Result
   * @param {string} groupId Valor a consultar UUID v4
   * @return {Promise<Result>} Retorno de la consulta, puede ser ana entidad del tipo enviado o un booleano
   * @memberof GroupIdExistQuery
   */
  query<Result = boolean>(groupId: string): Promise<Result> {
    return this.send(
      'academic-offer.group-id-exist',
      JSON.stringify({ data: groupId }),
    );
  }
}
