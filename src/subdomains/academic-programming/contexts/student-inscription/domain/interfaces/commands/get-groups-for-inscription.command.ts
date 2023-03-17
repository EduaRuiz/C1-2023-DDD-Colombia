/**
 * Comando para traer los grupos según materia y estado
 *
 * @export
 * @interface IGetGroupsForInscriptionCommand
 */
export interface IGetGroupsForInscriptionCommand {
  /**
   * Id de la materia
   *
   * @type {string}
   * @memberof IGetGroupsForInscriptionCommand
   */
  subjectId: string;
  /**
   * Estado del grupo
   *
   * @type {string}
   * @memberof IGetGroupsForInscriptionCommand
   */
  groupState: string;
}
