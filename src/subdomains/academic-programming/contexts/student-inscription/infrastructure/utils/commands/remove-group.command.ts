import { IRemoveGroupCommand } from '@contexts/student-inscription/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

/**
 * Comando para agregar grupos
 *
 * @export
 * @class RemoveGroupCommand
 * @implements {IRemoveGroupCommand}
 */
export class RemoveGroupCommand implements IRemoveGroupCommand {
  /**
   *Id inscripcion
   *
   * @type {string}
   * @memberof RemoveGroupCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Id de inscripcion obligatorio' })
  inscriptionId: string;
  /**
   *Id grupo
   *
   * @type {string}
   * @memberof RemoveGroupCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Id de grupo obligatorio' })
  groupId: string;
}
