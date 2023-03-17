import { IAddGroupCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsDefined, IsString } from 'class-validator';

/**
 * Comando para agregar grupos
 *
 * @export
 * @class AddGroupCommand
 * @implements {IAddGroupCommand}
 */
export class AddGroupCommand implements IAddGroupCommand {
  /**
   *Id inscripcion
   *
   * @type {string}
   * @memberof AddGroupCommand
   */
  @IsDefined()
  @IsString({ message: 'Id de inscripcion obligatorio' })
  inscriptionId: string;
  /**
   *Id grupo
   *
   * @type {string}
   * @memberof AddGroupCommand
   */
  @IsDefined()
  @IsString({ message: 'Id de grupo obligatorio' })
  groupId: string;
}
