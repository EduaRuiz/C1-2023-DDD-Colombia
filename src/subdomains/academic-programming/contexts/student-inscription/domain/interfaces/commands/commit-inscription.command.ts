/**
 * Comando para comprometer inscripciones
 *
 * @export
 * @interface ICommitInscriptionCommand
 */
export interface ICommitInscriptionCommand {
  /**
   * Id del estudiante
   *
   * @type {string}
   * @memberof ICommitInscriptionCommand
   */
  studentId: string;
  /**
   * Id del semestre
   *
   * @type {string}
   * @memberof ICommitInscriptionCommand
   */
  semesterId: string;
  /**
   * Ids de los grupos []
   *
   * @type {string[]}
   * @memberof ICommitInscriptionCommand
   */
  groupIds: string[];
}
