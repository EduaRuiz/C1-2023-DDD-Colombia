import { EventPublisherBase } from '@sofka/bases';

/**
 * Clase usada para la generación de queries a partir de eventos
 *
 * @export
 * @abstract
 * @class EntityExistQueryBase
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class EntityExistQueryBase<
  Response,
> extends EventPublisherBase<Response> {
  /**
   * Método que se encargara de recibir el ID para validar
   *
   * @abstract
   * @template Result Tipo de respuesta
   * @param {...string[]} args ID UUID v4 para validar
   * @return {Promise<Result>} Responde si existe
   * @memberof EntityExistQueryBase
   */
  abstract query<Result = any>(...args: string[]): Promise<Result>;
}
