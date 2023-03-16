import { ICommitInscriptionCommand } from '@contexts/student-inscription/domain/interfaces';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsString,
} from 'class-validator';

export class CommitInscriptionCommand implements ICommitInscriptionCommand {
  @IsDefined()
  @IsString({ message: 'Id de estudiante obligatorio' })
  studentId: string;
  @IsDefined()
  @IsString({ message: 'Id de semestre obligatorio' })
  semesterId: string;
  @IsDefined()
  @IsArray({ message: 'groupsId necesario' })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsString({ each: true })
  groupIds: string[];
}
