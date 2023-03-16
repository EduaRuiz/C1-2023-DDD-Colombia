import { IGetInscriptionInfoCommand } from '@contexts/student-inscription/domain/interfaces';
import { IsString } from 'class-validator';

export class GetInscriptionInfoCommand implements IGetInscriptionInfoCommand {
  @IsString({ message: 'Id de la inscripcion obligatorio' })
  inscriptionId: string;
}
