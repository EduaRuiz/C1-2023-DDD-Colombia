import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import {
  ICommitInscriptionCommand,
  ICommittedInscriptionResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { ValueObjectBase, ValueObjectErrorHandler } from '@sofka/bases';
import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
import { SemesterIdValueObject } from '@contexts/student-inscription/domain/value-objects/semester';
import { StudentIdValueObject } from '@contexts/student-inscription/domain/value-objects/student';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import {
  DateTimeValueObject,
  InscriptionStateValueObject,
} from '@contexts/student-inscription/domain/value-objects/inscription';
import {
  IGroupDomainService,
  IInscriptionDomainService,
  ISemesterDomainService,
  IStudentDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  CommittedInscriptionEventPublisher,
  GotGroupInfoEventPublisher,
  GotSemesterInfoEventPublisher,
  GotStudentInfoEventPublisher,
  SubscribedGroupEventPublisher,
  Topic,
} from '@contexts/student-inscription/domain/events';
import { ValueObjectException } from '@sofka/exceptions';
import { IUseCase } from '@sofka/interfaces';

/**
 * Genera el caso de uso al crear una inscripcion
 *
 * @export
 * @class CommitInscriptionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<ICommitInscriptionCommand, ICommittedInscriptionResponse>}
 */
export class CommitInscriptionUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICommitInscriptionCommand, ICommittedInscriptionResponse>
{
  private readonly inscriptionAggregateRoot: InscriptionAggregateRoot;

  /**
   * Crea la instancia de CommitInscriptionUseCase.
   *
   * @param {IInscriptionDomainService} inscription$ Servicio de inscripcion
   * @param {IGroupDomainService} group$ Servicio de grupos
   * @param {IStudentDomainService} student$ Servicio de estudiantes
   * @param {ISemesterDomainService} semester$ Servicio de semestres
   * @param {CommittedInscriptionEventPublisher} committedInscriptionEventPublisher Publicador del caso de uso
   * @param {GotGroupInfoEventPublisher} gotGroupInfoEventPublisher Publicador de grupos consultados
   * @param {GotStudentInfoEventPublisher} gotStudentInfoEventPublisher Publicador de estudiantes consultados
   * @param {GotSemesterInfoEventPublisher} gotSemesterInfoEventPublisher Publicador de semestres consultados
   * @param {SubscribedGroupEventPublisher} subscribedGroupEventPublisher Publicador de grupos suscritos
   * @memberof CommitInscriptionUseCase
   */
  constructor(
    inscription$: IInscriptionDomainService,
    private readonly group$: IGroupDomainService,
    student$: IStudentDomainService,
    semester$: ISemesterDomainService,
    committedInscriptionEventPublisher: CommittedInscriptionEventPublisher,
    gotGroupInfoEventPublisher: GotGroupInfoEventPublisher,
    gotStudentInfoEventPublisher: GotStudentInfoEventPublisher,
    gotSemesterInfoEventPublisher: GotSemesterInfoEventPublisher,
    subscribedGroupEventPublisher: SubscribedGroupEventPublisher,
  ) {
    super();
    const events = new Map();
    events.set(Topic.CommittedInscription, committedInscriptionEventPublisher);
    events.set(Topic.GotGroupInfo, gotGroupInfoEventPublisher);
    events.set(Topic.GotStudentInfo, gotStudentInfoEventPublisher);
    events.set(Topic.GotSemesterInfo, gotSemesterInfoEventPublisher);
    events.set(Topic.SubscribedGroup, subscribedGroupEventPublisher);
    this.inscriptionAggregateRoot = new InscriptionAggregateRoot({
      inscription$,
      group$,
      events,
      student$,
      semester$,
    });
  }
  /**
   * Método que ejecuta todo el caso de uso
   *
   * @param {ICommitInscriptionCommand} command Comando con la información necesaria
   * @return {Promise<ICommittedInscriptionResponse>} Retorna la entidad al crearla
   * @memberof CommitInscriptionUseCase
   */
  async execute(
    command: ICommitInscriptionCommand,
  ): Promise<ICommittedInscriptionResponse> {
    const data = await this.executeCommand(command);
    return { success: data ? true : false, data };
  }

  /**
   * Reparte las responsabilidad
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @return {(Promise<InscriptionDomainEntity | null>)} Retorna la entidad creada o en su defecto u null
   * @memberof CommitInscriptionUseCase
   */
  private async executeCommand(
    command: ICommitInscriptionCommand,
  ): Promise<InscriptionDomainEntity | null> {
    this.validateCommand(command);
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const entity = await this.createEntityInscription(command);
    return this.executeAggregateRoot(entity);
  }

  /**
   * Valida si el comando no tiene valores indefinidos
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @memberof CommitInscriptionUseCase
   */
  private validateCommand(command: ICommitInscriptionCommand): void {
    if (!command.groupIds || !command.semesterId || !command.studentId) {
      throw new ValueObjectException(
        `commando invalido groupId, semesterId y studentId, deben ser enviados, ${JSON.stringify(
          command,
        )}`,
        this.getErrors(),
      );
    }
  }

  /**
   * Crea los Objetos de valor que se van a evaluar
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @return {ValueObjectBase<any>[]} Retorna Array de objetos de valor
   * @memberof CommitInscriptionUseCase
   */
  private createValueObjects(
    command: ICommitInscriptionCommand,
  ): ValueObjectBase<any>[] {
    const groupIdsValueObjects: GroupIdValueObject[] = [];
    for (const groupId of command.groupIds) {
      groupIdsValueObjects.push(new GroupIdValueObject(groupId));
    }
    const semesterId = new SemesterIdValueObject(command.semesterId);
    const studentId = new StudentIdValueObject(command.semesterId);
    const dateTime = new DateTimeValueObject();
    const inscriptionState = new InscriptionStateValueObject('active');
    return [
      ...groupIdsValueObjects,
      semesterId,
      studentId,
      dateTime,
      inscriptionState,
    ];
  }

  /**
   * Valida todos los objetos de valor
   *
   * @private
   * @param {ValueObjectBase<any>[]} valueObjects Lista de objetos de valor
   * @memberof CommitInscriptionUseCase
   */
  private validateValueObjects(valueObjects: ValueObjectBase<any>[]) {
    for (const valueObject of valueObjects) {
      if (valueObject.hasErrors()) {
        this.setErrors(valueObject.getErrors());
      }
    }
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'Existen algunos errores en el comando',
        this.getErrors(),
      );
    }
  }

  /**
   * Genera la entidad a ser enviada en el agregado
   *
   * @private
   * @param {ICommitInscriptionCommand} command Objeto con toda la información necesaria
   * @return {Promise<InscriptionDomainEntity>} Entidad a crear
   * @memberof CommitInscriptionUseCase
   */
  private async createEntityInscription(
    command: ICommitInscriptionCommand,
  ): Promise<InscriptionDomainEntity> {
    const student = await this.inscriptionAggregateRoot.getStudent(
      command.studentId,
    );
    const semester = await this.inscriptionAggregateRoot.getSemester(
      command.semesterId,
    );
    const groups: GroupDomainEntity[] = [];
    for (const groupId of command.groupIds) {
      const group = await this.group$.getGroup(groupId);
      groups.push(group);
    }
    return new InscriptionDomainEntity(
      student,
      semester,
      groups,
      'active',
      new Date(Date.now()),
    );
  }

  /**
   * Ejecuta el método del agregado encargado del final del proceso
   *
   * @private
   * @param {InscriptionDomainEntity} entity Entidad a guardar
   * @return {(Promise<InscriptionDomainEntity | null>)} Retorna la entidad guardada o null
   * @memberof CommitInscriptionUseCase
   */
  private executeAggregateRoot(
    entity: InscriptionDomainEntity,
  ): Promise<InscriptionDomainEntity | null> {
    return this.inscriptionAggregateRoot.commitInscription(entity);
  }
}
