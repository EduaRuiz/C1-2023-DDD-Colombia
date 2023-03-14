/**
 * Comando para el proceso de agregar un grupo a una inscripción
 *
 * @export
 * @interface IRemoveGroupCommand
 */
export interface IRemoveGroupCommand {
  /**
   * Id de la inscripción
   *
   * @type {string}
   * @memberof IRemoveGroupCommand
   */
  inscriptionId: string;
  /**
   * Id del grupo a quitar
   *
   * @type {string}
   * @memberof IRemoveGroupCommand
   */
  groupId: string;
}
