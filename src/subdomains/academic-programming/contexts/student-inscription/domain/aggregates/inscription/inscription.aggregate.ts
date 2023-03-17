import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../../events/publishers/enums';
import {
  ClassDayDomainEntity,
  GroupDomainEntity,
  InscriptionDomainEntity,
  SemesterDomainEntity,
  StudentDomainEntity,
} from '../../entities';
import {
  IClassDayDomainService,
  IGroupDomainService,
  IInscriptionDomainService,
  ISemesterDomainService,
  IStudentDomainService,
} from '../../services';
import {
  ChangeInscriptionStateHelper,
  CommitInscriptionHelper,
  GetAllClassDaysByGroupHelper,
  GetAllGroupsByInscriptionHelper,
  GetAllGroupsHelper,
  GetAllInscriptionsByStudentHelper,
  GetClassDayHelper,
  GetGroupHelper,
  GetInscriptionHelper,
  GetSemesterHelper,
  GetStudentHelper,
  SubscribeGroupHelper,
  UnsubscribeGroupHelper,
} from './helpers';

/**
 * Clase principal AggregateRoot del contexto student inscription
 * Aplica todos los servicios relacionados con sus entidades de apoyo
 *
 * @export
 * @class InscriptionAggregateRoot
 * @implements {IClassDayDomainService}
 * @implements {IGroupDomainService}
 * @implements {IInscriptionDomainService}
 * @implements {ISemesterDomainService}
 * @implements {IStudentDomainService}
 */
export class InscriptionAggregateRoot
  implements
    IClassDayDomainService,
    IGroupDomainService,
    IInscriptionDomainService,
    ISemesterDomainService,
    IStudentDomainService
{
  /**
   * Servicio de la entidad dia de clase
   *
   * @private
   * @type {IClassDayDomainService}
   * @memberof InscriptionAggregateRoot
   */
  private readonly classDay$?: IClassDayDomainService;
  /**
   * Servicio de la entidad grupo
   *
   * @private
   * @type {IGroupDomainService}
   * @memberof InscriptionAggregateRoot
   */
  private readonly group$?: IGroupDomainService;
  /**
   * Servicio de la entidad inscripción
   *
   * @private
   * @type {IGroupDomainService}
   * @memberof InscriptionAggregateRoot
   */
  private readonly inscription$?: IInscriptionDomainService;
  /**
   * Servicio de la entidad semestre
   *
   * @private
   * @type {ISemesterDomainService}
   * @memberof InscriptionAggregateRoot
   */
  private readonly semester$?: ISemesterDomainService;
  /**
   * Servicio de la entidad estudiante
   *
   * @private
   * @type {IStudentDomainService}
   * @memberof InscriptionAggregateRoot
   */
  private readonly student$?: IStudentDomainService;
  /**
   * Mapa de todos los eventos asociados a cada una de los acciones de los servicios relacionados
   * Mediante este mapa se puede recibir y filtrar solo el evento necesario por acción
   *
   * @private
   * @type {Map<Topic, EventPublisherBase<any>>}
   * @memberof InscriptionAggregateRoot
   */
  private readonly events: Map<Topic, EventPublisherBase<any>>;

  /**
   * Crea una instancia de InscriptionAggregateRoot.
   * @param {{
   *     classDay$?: IClassDayDomainService;
   *     group$?: IGroupDomainService;
   *     inscription$?: IInscriptionDomainService;
   *     semester$?: ISemesterDomainService;
   *     student$?: IStudentDomainService;
   *     events?: Map<Topic, EventPublisherBase<any>>;
   *   }} {
   *     classDay$: Instancia del tipo servicio dia de clase,
   *     group$: Instancia del tipo servicio grupo,
   *     inscription$: Instancia del tipo servicio inscripción,
   *     semester$: Instancia del tipo servicio semestre,
   *     student$: Instancia del tipo servicio estudiante,
   *     events: Mapa de instancia del o los eventos relacionados a la acción del método invocado,
   *   }
   * @memberof InscriptionAggregateRoot
   */
  constructor({
    classDay$,
    group$,
    inscription$,
    semester$,
    student$,
    events,
  }: {
    classDay$?: IClassDayDomainService;
    group$?: IGroupDomainService;
    inscription$?: IInscriptionDomainService;
    semester$?: ISemesterDomainService;
    student$?: IStudentDomainService;
    events?: Map<Topic, EventPublisherBase<any>>;
  }) {
    this.classDay$ = classDay$;
    this.group$ = group$;
    this.inscription$ = inscription$;
    this.semester$ = semester$;
    this.student$ = student$;
    this.events = events ?? new Map<Topic, any>();
  }

  /**
   * Ejecuta el servicio de dia de clase
   * para esto es necesario dicho servicio y un evento del tipo GotClassDayInfoEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} classDayId UUID v4 del dia de clase consultado
   * @return {Promise<ClassDayDomainEntity>} Retorna un objeto ClassDay correspondiente
   * @memberof InscriptionAggregateRoot
   */
  getClassDay(classDayId: string): Promise<ClassDayDomainEntity> {
    return GetClassDayHelper(
      classDayId,
      this.classDay$,
      this.events.get(Topic.GotClassDayInfo),
    );
  }

  /**
   * Ejecuta el servicio de dia de clase
   * para esto es necesario dicho servicio y un evento del tipo GotClassDaysEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} groupId UUID v4 del grupo al que pertenecen los ClassDays
   * @return {Promise<ClassDayDomainEntity[]>} Retorna la lista de ClassDays del grupo correspondiente
   * @memberof InscriptionAggregateRoot
   */
  getAllClassDaysByGroup(groupId: string): Promise<ClassDayDomainEntity[]> {
    return GetAllClassDaysByGroupHelper(
      groupId,
      this.classDay$,
      this.events.get(Topic.GotClassDays),
    );
  }

  /**
   * Ejecuta el servicio de grupo
   * para esto es necesario dicho servicio y un evento del tipo GotGroupInfoEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} groupId UUID v4 del grupo consultado
   * @return {Promise<GroupDomainEntity>} Retorna el objeto Group correspondiente
   * @memberof InscriptionAggregateRoot
   */
  getGroup(groupId: string): Promise<GroupDomainEntity> {
    return GetGroupHelper(
      groupId,
      this.group$,
      this.events.get(Topic.GotGroupInfo),
    );
  }

  /**
   * Ejecuta el servicio de grupo
   * para esto es necesario dicho servicio y un evento del tipo GotGroupsEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} inscriptionId UUID v4 de la inscripción a la que pertenecen los grupos
   * @return {Promise<GroupDomainEntity[]>} Retorna la lista de Groups de la Inscription correspondiente
   * @memberof InscriptionAggregateRoot
   */
  getAllGroupsByInscription(
    inscriptionId: string,
  ): Promise<GroupDomainEntity[]> {
    return GetAllGroupsByInscriptionHelper(
      inscriptionId,
      this.group$,
      this.events.get(Topic.GotGroups),
    );
  }

  /**
   * Ejecuta el servicio de grupo
   * para esto es necesario dicho servicio y un evento del tipo GotGroupsEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} subjectId UUID v4 de la materia
   * @param {string} groupState Estado del grupo
   * @return {Promise<GroupDomainEntity[]>} Retorna la lista de Groups de la Inscription correspondiente
   * @memberof InscriptionAggregateRoot
   */
  getAllGroups(
    subjectId: string,
    groupState: string,
  ): Promise<GroupDomainEntity[]> {
    return GetAllGroupsHelper(
      subjectId,
      groupState,
      this.group$,
      this.events.get(Topic.GotGroups),
    );
  }

  /**
   * Ejecuta el servicio de grupo
   * para esto es necesario dicho servicio y un evento del tipo SubscribedGroupEventPublisher
   * inyectados desde el constructor
   *
   * @param {GroupDomainEntity} group Instancia del objeto a registrar
   * @return {Promise<GroupDomainEntity>} Retorna la misma instancia del objeto enviado
   * @memberof InscriptionAggregateRoot
   */
  subscribeGroup(
    inscriptionId: string,
    group: GroupDomainEntity,
  ): Promise<GroupDomainEntity> {
    return SubscribeGroupHelper(
      inscriptionId,
      group,
      this.group$,
      this.events.get(Topic.SubscribedGroup),
    );
  }

  /**
   * Ejecuta el servicio de grupo
   * para esto es necesario dicho servicio y un evento del tipo UnsubscribedGroupEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} groupId UUID v4 del grupo del que se va a des suscribir
   * @return {Promise<GroupDomainEntity>} Retorna la instancia del grupo
   * @memberof InscriptionAggregateRoot
   */
  unsubscribeGroup(
    inscriptionId: string,
    groupId: string,
  ): Promise<GroupDomainEntity> {
    return UnsubscribeGroupHelper(
      inscriptionId,
      groupId,
      this.group$,
      this.events.get(Topic.UnsubscribedGroup),
    );
  }

  /**
   * Ejecuta el servicio de inscripción
   * para esto es necesario dicho servicio y un evento del tipo GotInscriptionInfoEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} inscriptionId UUID v4 de la inscripción a consultar
   * @return {Promise<InscriptionDomainEntity>} Retorna un objeto de la inscripción consultada
   * @memberof InscriptionAggregateRoot
   */
  getInscription(inscriptionId: string): Promise<InscriptionDomainEntity> {
    return GetInscriptionHelper(
      inscriptionId,
      this.inscription$,
      this.events.get(Topic.GotInscriptionInfo),
    );
  }

  /**
   * Ejecuta el servicio de inscripción
   * para esto es necesario dicho servicio y un evento del tipo GotInscriptionsEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} studentId UUID v4 del estudiante relacionado a las inscripciones
   * @return {Promise<InscriptionDomainEntity[]>} Retorna la lista de inscripciones asociadas al estudiante
   * @memberof InscriptionAggregateRoot
   */
  getAllInscriptionsByStudent(
    studentId: string,
  ): Promise<InscriptionDomainEntity[]> {
    return GetAllInscriptionsByStudentHelper(
      studentId,
      this.inscription$,
      this.events.get(Topic.GotInscriptions),
    );
  }

  /**
   * Ejecuta el servicio de inscripción
   * para esto es necesario dicho servicio y un evento del tipo ChangedInscriptionStateEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} inscriptionId UUID a actualizar o cambiar
   * @param {string} inscriptionState Nuevo estado
   * @return {Promise<InscriptionDomainEntity>} Retorna instancia de la inscripción actualizada
   * @memberof InscriptionAggregateRoot
   */
  changeInscriptionState(
    inscriptionId: string,
    inscriptionState: string,
  ): Promise<InscriptionDomainEntity> {
    return ChangeInscriptionStateHelper(
      inscriptionId,
      inscriptionState,
      this.inscription$,
      this.events.get(Topic.ChangedInscriptionState),
    );
  }

  /**
   * Ejecuta el servicio de inscripción
   * para esto es necesario dicho servicio y un evento del tipo CommittedInscriptionEventPublisher
   * inyectados desde el constructor
   *
   * @param {InscriptionDomainEntity} inscription Instancia de nueva inscripción a registrar
   * @return {Promise<InscriptionDomainEntity>} Retorna la instancia de la nueva inscripción
   * @memberof InscriptionAggregateRoot
   */
  commitInscription(
    inscription: InscriptionDomainEntity,
  ): Promise<InscriptionDomainEntity> {
    return CommitInscriptionHelper(
      inscription,
      this.inscription$,
      this.group$,
      this.events.get(Topic.CommittedInscription),
      this.events.get(Topic.SubscribedGroup),
      this.events.get(Topic.GotInscriptions),
    );
  }

  /**
   * Ejecuta el servicio de semestre
   * para esto es necesario dicho servicio y un evento del tipo GotSemesterInfoEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} semesterId UUID v4 del semestre a consultar
   * @return {Promise<SemesterDomainEntity>} Instancia del semestre consultado
   * @memberof InscriptionAggregateRoot
   */
  getSemester(semesterId: string): Promise<SemesterDomainEntity> {
    return GetSemesterHelper(
      semesterId,
      this.semester$,
      this.events.get(Topic.GotSemesterInfo),
    );
  }

  /**
   * Ejecuta el servicio de semestre
   * para esto es necesario dicho servicio y un evento del tipo GotStudentInfoEventPublisher
   * inyectados desde el constructor
   *
   * @param {string} studentId UUID v4 del estudiante a consultar
   * @return {Promise<StudentDomainEntity>} Instancia del estudiante consulado
   * @memberof InscriptionAggregateRoot
   */
  getStudent(studentId: string): Promise<StudentDomainEntity> {
    return GetStudentHelper(
      studentId,
      this.student$,
      this.events.get(Topic.GotStudentInfo),
    );
  }
}
