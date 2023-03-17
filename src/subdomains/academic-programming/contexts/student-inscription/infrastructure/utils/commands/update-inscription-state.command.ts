import { IUpdateInscriptionStateCommand } from '@contexts/student-inscription/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

/**
 * Comando para actualiza restado a inscripcion
 *
 * @export
 * @class UpdateInscriptionStateCommand
 * @implements {IUpdateInscriptionStateCommand}
 */
export class UpdateInscriptionStateCommand
  implements IUpdateInscriptionStateCommand
{
  /**
   * Estado inscripcion
   *
   * @type {string}
   * @memberof UpdateInscriptionStateCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Estado de inscripcion obligatorio' })
  inscriptionState: string;
  /**
   * Id inscripcion
   *
   * @type {string}
   * @memberof UpdateInscriptionStateCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Id de inscripcion obligatorio' })
  inscriptionId: string;
}
