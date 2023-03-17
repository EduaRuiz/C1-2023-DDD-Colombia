import { IUpdateInscriptionStateCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsDefined, IsString } from 'class-validator';

export class UpdateInscriptionStateCommand
  implements IUpdateInscriptionStateCommand
{
  @IsDefined()
  @IsString({ message: 'Estado de inscripcion obligatorio' })
  inscriptionState: string;
  @IsDefined()
  @IsString({ message: 'Id de inscripcion obligatorio' })
  inscriptionId: string;
}
