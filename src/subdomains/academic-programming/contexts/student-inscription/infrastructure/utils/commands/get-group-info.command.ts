import { IGetGroupInfoCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsString } from 'class-validator';

export class GetGroupInfoCommand implements IGetGroupInfoCommand {
  @IsString({ message: 'Id del grupo obligatorio' })
  groupId: string;
}
