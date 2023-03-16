import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CommitInscriptionCommand } from '../utils/commands';
import {
  CommitInscriptionUseCase,
  GetInscriptionInfoUseCase,
} from '@contexts/student-inscription/application/use-cases';
import {
  GroupService,
  InscriptionService,
  SemesterService,
  StudentService,
} from '../persistence/services';
import {
  CommittedInscriptionPublisher,
  GotGroupInfoPublisher,
  GotInscriptionInfoPublisher,
  GotSemesterInfoPublisher,
  GotStudentInfoPublisher,
  SubscribedGroupPublisher,
} from '../messaging/publishers';
import { GetInscriptionInfoCommand } from '../utils/commands';
import {
  GroupPostgresEntity,
  InscriptionPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from '../persistence/databases/postgres/entities';

@Controller('student-inscription')
export class StudentInscriptionController {
  constructor(
    private readonly inscriptionService: InscriptionService,
    private readonly groupService: GroupService,
    private readonly studentService: StudentService,
    private readonly semesterService: SemesterService,
    private readonly committedInscriptionPublisher: CommittedInscriptionPublisher,
    private readonly gotInscriptionInfoPublisher: GotInscriptionInfoPublisher,
    private readonly gotGroupInfoPublisher: GotGroupInfoPublisher,
    private readonly gotStudentInfoPublisher: GotStudentInfoPublisher,
    private readonly gotSemesterInfoPublisher: GotSemesterInfoPublisher,
    private readonly subscribedGroupPublisher: SubscribedGroupPublisher,
  ) {}

  @Post('inscription/commit')
  async commitInscription(@Body() command: CommitInscriptionCommand) {
    const useCase = new CommitInscriptionUseCase(
      this.inscriptionService,
      this.groupService,
      this.studentService,
      this.semesterService,
      this.committedInscriptionPublisher,
      this.gotGroupInfoPublisher,
      this.gotStudentInfoPublisher,
      this.gotSemesterInfoPublisher,
      this.subscribedGroupPublisher,
    );
    return await useCase.execute(command);
  }

  @Get('inscription/info/:id')
  inscriptionInfo(@Param('id') inscriptionId: string): JSON {
    const command: GetInscriptionInfoCommand = { inscriptionId };
    const useCase = new GetInscriptionInfoUseCase(
      this.gotInscriptionInfoPublisher,
      this.inscriptionService,
    );
    return JSON.parse(JSON.stringify(useCase.execute(command)));
  }
}
