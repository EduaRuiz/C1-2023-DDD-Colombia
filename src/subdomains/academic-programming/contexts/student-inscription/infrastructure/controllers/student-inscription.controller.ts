import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  AddGroupCommand,
  CommitInscriptionCommand,
  GetGroupInfoCommand,
  GetGroupsForInscriptionCommand,
  GetInscriptionInfoCommand,
  RemoveGroupCommand,
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
  GotInscriptionsPublisher,
  GotSemesterInfoPublisher,
  GotStudentInfoPublisher,
  SubscribedGroupPublisher,
  UnsubscribedGroupPublisher,
} from '../messaging/publishers';
import { GroupPostgresEntity } from '../persistence/databases/postgres/entities';
import { SubjectIdExistService } from '../utils/services';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestSwagger,
  GroupSwaggerEntity,
  InscriptionSwaggerEntity,
  NotFoundSwagger,
  UnauthorizedSwagger,
} from '../utils/swagger-types';

/**
 * Controlador principal del contexto
 *
 * @export
 * @class StudentInscriptionController
 */
@Controller('student-inscription')
@ApiTags('student-inscription-controller')
export class StudentInscriptionController {
  /**
   * Crea una instancia de StudentInscriptionController.
   * @param {JwtService} jwtService Servicio para el TWT
   * @param {SubjectIdExistService} subjectIdExistService Servicio de materias
   * @param {InscriptionService} inscriptionService Servicio inscripciones
   * @param {GroupService} groupService Servicio grupos
   * @param {StudentService} studentService Servicio estudiantes
   * @param {SemesterService} semesterService Servicio semestres
   * @param {CommittedInscriptionPublisher} committedInscriptionPublisher Publicador de creación de inscripcion
   * @param {GotInscriptionInfoPublisher} gotInscriptionInfoPublisher Publicador al traer inscripcion
   * @param {GotGroupInfoPublisher} gotGroupInfoPublisher Publicador al traer grupo
   * @param {GotStudentInfoPublisher} gotStudentInfoPublisher Publicador al traer estudiante
   * @param {GotSemesterInfoPublisher} gotSemesterInfoPublisher Publicador al traer semestre
   * @param {SubscribedGroupPublisher} subscribedGroupPublisher Publicador al agregar grupo
   * @param {UnsubscribedGroupPublisher} unsubscribedGroupPublisher Publicador al quitar grupo
   * @param {ChangedInscriptionStatePublisher} changedInscriptionStatePublisher Publicador al cambiar estado de inscripcion
   * @param {GotGroupsPublisher} gotGroupsPublisher Publicador al traer grupos
   * @param {GotInscriptionsPublisher} gotInscriptionsPublisher Publicador al traer inscripciones
   * @memberof StudentInscriptionController
   */
  constructor(
    private readonly jwtService: JwtService,
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
    private readonly gotInscriptionsPublisher: GotInscriptionsPublisher,
  ) {}

  /**
   * Crea una inscripcion
   *
   * @param {CommitInscriptionCommand} command Datos para el registro
   * @return {Promise<JSON>} Respuesta
   * @memberof StudentInscriptionController
   */
  @Post('inscription/commit')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Crea una inscripcion usando la información suministrada',
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripcion creada',
    type: InscriptionSwaggerEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
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
      this.gotInscriptionsPublisher,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  /**
   * Trae información de una inscripcion
   *
   * @param {string} inscriptionId Id de la inscripcion
   * @return {Promise<JSON>} Respuesta
   * @memberof StudentInscriptionController
   */
  @Get('inscription/info/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna un grupo',
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripcion solicitada',
    type: InscriptionSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  async getInscriptionInfo(@Param('id') inscriptionId: string): Promise<JSON> {
    const command: GetInscriptionInfoCommand = { inscriptionId };
    const useCase = new GetInscriptionInfoUseCase(
      this.gotInscriptionInfoPublisher,
      this.inscriptionService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  /**
   * Agrega grupo a inscripcion
   *
   * @param {AddGroupCommand} command Datos necesarios para inscripcion id grupo y id inscripcion
   * @return {Promise<JSON>} Respuesta de grupo agregado
   * @memberof StudentInscriptionController
   */
  @Post('inscription/add-group')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Agrega grupo a inscripcion',
  })
  @ApiResponse({
    status: 200,
    description: 'Grupo agregado',
    type: GroupSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  async addGroup(@Body() command: AddGroupCommand): Promise<JSON> {
    const useCase = new AddGroupUseCase(
      this.groupService,
      this.subscribedGroupPublisher,
      this.gotGroupInfoPublisher,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  /**
   * Trae información de grupo
   *
   * @param {string} groupId Id de grupo
   * @return {Promise<JSON>} Respuesta de grupo
   * @memberof StudentInscriptionController
   */
  @Get('group/info/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna un grupo',
  })
  @ApiResponse({
    status: 200,
    description: 'Grupo solicitado',
    type: GroupSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  async getGroupInfo(@Param('id') groupId: string): Promise<JSON> {
    const command: GetGroupInfoCommand = { groupId };
    const useCase = new GetGroupInfoUseCase(
      this.gotGroupInfoPublisher,
      this.groupService,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  /**
   * Retorna listado de grupos para inscripcion
   *
   * @param {GetGroupsForInscriptionCommand} command Id de materia y estado del grupo
   * @return {Promise<JSON>} Lista de grupos
   * @memberof StudentInscriptionController
   */
  @Post('group/for-inscription')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna lista de grupos según criterio',
  })
  @ApiResponse({
    status: 200,
    description: 'Grupo solicitado',
    type: [GroupSwaggerEntity],
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
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

  /**
   * Retira grupo de inscripcion
   *
   * @param {RemoveGroupCommand} command Id de inscripcion y de grupo
   * @return {Promise<JSON>} Grupo retirado
   * @memberof StudentInscriptionController
   */
  @Post('inscription/remove-group')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Remueve un grupo de una inscripcion',
  })
  @ApiResponse({
    status: 200,
    description: 'Grupo removido',
    type: GroupSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  async removeGroup(@Body() command: RemoveGroupCommand): Promise<JSON> {
    const useCase = new RemoveGroupUseCase(
      this.groupService,
      this.unsubscribedGroupPublisher,
    );
    return JSON.parse(JSON.stringify(await useCase.execute(command)));
  }

  /**
   * Actualiza el estado de una inscripcion
   *
   * @param {UpdateInscriptionStateCommand} command Id de inscripcion y estado de inscripcion
   * @return {Promise<JSON>} Retorna inscripcion actualizada
   * @memberof StudentInscriptionController
   */
  @Post('inscription/update-state')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Actualiza el estado de una inscripcion',
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripcion solicitada',
    type: InscriptionSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
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

  /**
   * Para uso interno
   *
   * @param {{
   *       professorName: string;
   *       subjectName: string;
   *       subjectId: string;
   *       quotaAvailable: number;
   *       classDays: [{ weekday: string; startTime: number; duration: number }];
   *     }} command info para crear
   * @return {*} grupo creado
   * @memberof StudentInscriptionController
   */
  @Post('group/add')
  @ApiOperation({
    summary: 'crea un grupo',
  })
  @ApiResponse({
    status: 200,
    description: 'Grupo creado',
    type: GroupSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  async createGroup(
    @Body()
    command: {
      professorName: string;
      subjectName: string;
      subjectId: string;
      quotaAvailable: number;
      classDays: [{ weekday: string; startTime: number; duration: number }];
    },
  ): Promise<JSON> {
    const entity = command as unknown as GroupPostgresEntity;
    return JSON.parse(
      JSON.stringify(await this.groupService.createGroup(entity)),
    );
    // const repo = new GroupPostgresRepository(entity);
  }

  /**
   * Para generar token si existe id
   *
   * @param {string} id
   * @return {string} Token
   * @memberof StudentInscriptionController
   */
  @Get('token/:id')
  @ApiOperation({
    summary: 'Retorna un token',
  })
  @ApiResponse({
    status: 200,
    description: 'Token generado',
  })
  @ApiResponse({
    status: 404,
    description: 'No encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    type: UnauthorizedSwagger,
  })
  createToken(@Param('id') id: string): string {
    return this.getJwtPayload({ id });
  }

  /**
   * Privado para generar token
   *
   * @private
   * @param {{ id: string }} payload
   * @return {string} Token
   * @memberof StudentInscriptionController
   */
  private getJwtPayload(payload: { id: string }): string {
    const token = this.jwtService.sign(payload, { privateKey: 'llave' });
    return token;
  }
}
