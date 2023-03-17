import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import * as fs from 'fs';
import {
  AddGroupCommand,
  CommitInscriptionCommand,
  GetGroupInfoCommand,
  GetGroupsForInscriptionCommand,
  GetInscriptionInfoCommand,
  UpdateInscriptionStateCommand,
} from '../utils/commands';
import {
  AddGroupUseCase,
  CommitInscriptionUseCase,
  GetGroupInfoUseCase,
  GetGroupsForInscriptionUseCase,
  GetInscriptionInfoUseCase,
  RemoveGroupUseCase,
  UpdateInscriptionStateUseCase,
} from '@contexts/student-inscription/application/use-cases';
import {
  GroupService,
  InscriptionService,
  SemesterService,
  StudentService,
} from '../persistence/services';
import {
  ChangedInscriptionStatePublisher,
  CommittedInscriptionPublisher,
  GotGroupInfoPublisher,
  GotGroupsPublisher,
  GotInscriptionInfoPublisher,
  GotSemesterInfoPublisher,
  GotStudentInfoPublisher,
  SubscribedGroupPublisher,
  UnsubscribedGroupPublisher,
} from '../messaging/publishers';
import {
  GroupPostgresEntity,
  InscriptionPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from '../persistence/databases/postgres/entities';
import { SubjectIdExistService } from '../utils/services';

@Controller('student-inscription')
export class StudentInscriptionController {
  constructor(
    private readonly subjectIdExistService: SubjectIdExistService,
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
    private readonly unsubscribedGroupPublisher: UnsubscribedGroupPublisher,
    private readonly changedInscriptionStatePublisher: ChangedInscriptionStatePublisher,
    private readonly gotGroupsPublisher: GotGroupsPublisher,
  ) {}

  @Post('inscription/commit')
  async commitInscription(
    @Body() command: CommitInscriptionCommand,
  ): Promise<JSON> {
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
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Get('inscription/info/:id')
  async getInscriptionInfo(@Param('id') inscriptionId: string): Promise<JSON> {
    const command: GetInscriptionInfoCommand = { inscriptionId };
    const useCase = new GetInscriptionInfoUseCase(
      this.gotInscriptionInfoPublisher,
      this.inscriptionService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Post('inscription/add-group')
  async addGroup(@Body() command: AddGroupCommand): Promise<JSON> {
    const useCase = new AddGroupUseCase(
      this.groupService,
      this.subscribedGroupPublisher,
      this.gotGroupInfoPublisher,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Get('group/info/:id')
  async getGroupInfo(@Param('id') groupId: string): Promise<JSON> {
    const command: GetGroupInfoCommand = { groupId };
    const useCase = new GetGroupInfoUseCase(
      this.gotGroupInfoPublisher,
      this.groupService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Post('group/for-inscription')
  async getGroupsForInscription(
    @Body() command: GetGroupsForInscriptionCommand,
  ): Promise<JSON> {
    const useCase = new GetGroupsForInscriptionUseCase(
      this.gotGroupsPublisher,
      this.groupService,
      this.subjectIdExistService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Post('inscription/remove-group')
  async removeGroup(@Body() command: AddGroupCommand): Promise<JSON> {
    const useCase = new RemoveGroupUseCase(
      this.groupService,
      this.unsubscribedGroupPublisher,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Post('inscription/update-state')
  async updateInscriptionState(
    @Body() command: UpdateInscriptionStateCommand,
  ): Promise<JSON> {
    const useCase = new UpdateInscriptionStateUseCase(
      this.changedInscriptionStatePublisher,
      this.gotInscriptionInfoPublisher,
      this.inscriptionService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  @Post('group/add')
  createGroup(
    @Body()
    command: {
      professorName: string;
      subjectName: string;
      subjectId: string;
      quotaAvailable: number;
      classDays: [{ weekday: string; startTime: number; duration: number }];
    },
  ) {
    const entity = command as unknown as GroupPostgresEntity;
    return this.groupService.createGroup(entity);
    // const repo = new GroupPostgresRepository(entity);
  }

  @Post('group/random')
  createGroupRandom() {
    const jsonData = fs.readFileSync('database.json', 'utf8');
    const data = JSON.parse(jsonData);
    // const entity = command as unknown as GroupPostgresEntity;
    // return this.groupService.createGroup(entity);
    // const repo = new GroupPostgresRepository(entity);
  }
}
