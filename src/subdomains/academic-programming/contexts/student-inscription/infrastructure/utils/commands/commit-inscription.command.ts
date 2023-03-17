import { ICommitInscriptionCommand } from '@contexts/student-inscription/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsString,
} from 'class-validator';

/**
 * Comando para crear inscripcion
 *
 * @export
 * @class CommitInscriptionCommand
 * @implements {ICommitInscriptionCommand}
 */
export class CommitInscriptionCommand implements ICommitInscriptionCommand {
  /**
   * Id estudiante
   *
   * @type {string}
   * @memberof CommitInscriptionCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Id de estudiante obligatorio' })
  studentId: string;
  /**
   * Id semestre
   *
   * @type {string}
   * @memberof CommitInscriptionCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsString({ message: 'Id de semestre obligatorio' })
  semesterId: string;
  /**
   * Listado de ids de grupos
   *
   * @type {string[]}
   * @memberof CommitInscriptionCommand
   */
  @ApiProperty()
  @IsDefined()
  @IsArray({ message: 'groupsId necesario' })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsString({ each: true })
  groupIds: string[];
}
