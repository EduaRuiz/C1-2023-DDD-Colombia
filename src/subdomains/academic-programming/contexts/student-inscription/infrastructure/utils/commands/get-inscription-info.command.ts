import { IGetInscriptionInfoCommand } from '@contexts/student-inscription/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Comando para buscar inscripcion
 *
 * @export
 * @class GetInscriptionInfoCommand
 * @implements {IGetInscriptionInfoCommand}
 */
export class GetInscriptionInfoCommand implements IGetInscriptionInfoCommand {
  /**
   * Id inscripcion
   *
   * @type {string}
   * @memberof GetInscriptionInfoCommand
   */
  @ApiProperty()
  @IsString({ message: 'Id de la inscripcion obligatorio' })
  inscriptionId: string;
}
