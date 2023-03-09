import { EntityExistQueryBase } from '@contexts/student-inscription/domain/queries/bases';

/**
 * Valida si existe el ID suministrado
 *
 * @export
 * @abstract
 * @class InscriptionIdExistQuery
 * @extends {EntityExistQueryBase<Response>}
 * @template Response Tipo de respuesta
 */
export abstract class InscriptionIdExistQuery<
  Response = boolean,
> extends EntityExistQueryBase<Response> {
  /**
   *
   *
   * @template Result
   * @param {string} inscriptionId Valor a consultar UUID v4
   * @return {Promise<Result>} Retorno de la consulta, puede ser ana entidad del tipo enviado o un booleano
   * @memberof InscriptionIdExistQuery
   */
  query<Result = boolean>(inscriptionId: string): Promise<Result> {
    return this.send(
      'academic-offer.inscription-id-exist',
      JSON.stringify({ data: inscriptionId }),
    );
  }
}
