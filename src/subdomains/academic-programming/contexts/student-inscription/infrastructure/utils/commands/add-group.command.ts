import { IAddGroupCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsDefined, IsString } from 'class-validator';

export class AddGroupCommand implements IAddGroupCommand {
  @IsDefined()
  @IsString({ message: 'Id de inscripcion obligatorio' })
  inscriptionId: string;
  @IsDefined()
  @IsString({ message: 'Id de grupo obligatorio' })
  groupId: string;
}
