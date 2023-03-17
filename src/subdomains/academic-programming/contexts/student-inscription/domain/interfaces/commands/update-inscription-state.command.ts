/**
 * Comando para actualiza restado de inscripcion
 *
 * @export
 * @interface IUpdateInscriptionStateCommand
 */
export interface IUpdateInscriptionStateCommand {
  /**
   * Id inscripcion
   *
   * @type {string}
   * @memberof IUpdateInscriptionStateCommand
   */
  inscriptionId: string;
  /**
   * Nuevo estado inscripcion
   *
   * @type {string}
   * @memberof IUpdateInscriptionStateCommand
   */
  inscriptionState: string;
}
