import { IGetGroupInfoCommand } from '@contexts/student-inscription/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Comando para traer un grupo
 *
 * @export
 * @class GetGroupInfoCommand
 * @implements {IGetGroupInfoCommand}
 */
export class GetGroupInfoCommand implements IGetGroupInfoCommand {
  /**
   * Id grupo
   *
   * @type {string}
   * @memberof GetGroupInfoCommand
   */
  @ApiProperty()
  @IsString({ message: 'Id del grupo obligatorio' })
  groupId: string;
}
