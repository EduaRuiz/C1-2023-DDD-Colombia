import { IGetGroupsForInscriptionCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsString } from 'class-validator';

export class GetGroupsForInscriptionCommand
  implements IGetGroupsForInscriptionCommand
{
  @IsString({ message: 'Id de la materia obligatorio' })
  subjectId: string;
  @IsString({ message: 'Estado del grupo obligatorio' })
  groupState: string;
}
