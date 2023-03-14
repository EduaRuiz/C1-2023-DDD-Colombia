/**
 * Comando para el proceso de agregar un grupo a una inscripción
 *
 * @export
 * @interface IAddGroupCommand
 */
export interface IAddGroupCommand {
  /**
   * Id de la inscripción
   *
   * @type {string}
   * @memberof IAddGroupCommand
   */
  inscriptionId: string;
  /**
   * Id del grupo a agregar
   *
   * @type {string}
   * @memberof IAddGroupCommand
   */
  groupId: string;
}
