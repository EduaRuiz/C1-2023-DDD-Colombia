import { IGetGroupsForInscriptionCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsString } from 'class-validator';

/**
 * Comando para traer grupos para inscripcion
 *
 * @export
 * @class GetGroupsForInscriptionCommand
 * @implements {IGetGroupsForInscriptionCommand}
 */
export class GetGroupsForInscriptionCommand
  implements IGetGroupsForInscriptionCommand
{
  /**
   * Id materia
   *
   * @type {string}
   * @memberof GetGroupsForInscriptionCommand
   */
  @IsString({ message: 'Id de la materia obligatorio' })
  subjectId: string;
  /**
   * Estado grupo
   *
   * @type {string}
   * @memberof GetGroupsForInscriptionCommand
   */
  @IsString({ message: 'Estado del grupo obligatorio' })
  groupState: string;
}
