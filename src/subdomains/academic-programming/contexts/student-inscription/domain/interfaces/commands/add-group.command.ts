import { ClassDayDomainEntity } from '../../entities';

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
  /**
   * Dias de clase del grupo a agregar
   *
   * @type {ClassDayDomainEntity[]}
   * @memberof IAddGroupCommand
   */
  classDays: ClassDayDomainEntity[];
  /**
   * Nombre de la materia
   *
   * @type {string}
   * @memberof IAddGroupCommand
   */
  subjectName: string;
  subjectId: string;
  professorName: string;
  quoteAvailable: number;
  groupState: string;
}
