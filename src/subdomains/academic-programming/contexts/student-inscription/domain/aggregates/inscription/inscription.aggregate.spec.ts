jest.mock('./helpers');
import * as helpers from './helpers';
import { InscriptionAggregateRoot } from '.';
import {
  ClassDayDomainEntity,
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
import { EventPublisherBase } from '@sofka/bases';
import { Topic } from '../../events/publishers/enums';
import { GroupDomainEntity } from '../../entities/group.domain-entity';

describe('InscriptionAggregateRoot', () => {
  let classDayDomainService: IClassDayDomainService;
  let groupDomainService: IGroupDomainService;
  let inscriptionDomainService: IInscriptionDomainService;
  let semesterDomainService: ISemesterDomainService;
  let studentDomainService: IStudentDomainService;
  let events: Map<Topic, EventPublisherBase<any>>;

  beforeEach(() => {
    classDayDomainService = {} as IClassDayDomainService;
    groupDomainService = {} as IGroupDomainService;
    inscriptionDomainService = {} as IInscriptionDomainService;
    semesterDomainService = {} as ISemesterDomainService;
    studentDomainService = {} as IStudentDomainService;
    events = new Map<Topic, EventPublisherBase<any>>();
  });

  it('should be defined', () => {
    const inscriptionAggregateRoot = new InscriptionAggregateRoot({
      classDay$: classDayDomainService,
      events,
    });
    expect(inscriptionAggregateRoot).toBeDefined();
  });

  it('should be defined if no events', () => {
    const inscriptionAggregateRoot = new InscriptionAggregateRoot({
      classDay$: classDayDomainService,
    });
    expect(inscriptionAggregateRoot).toBeDefined();
  });

  describe('getClassDay', () => {
    it('should return a class day', async () => {
      // Arrange
      const classDayId = 'class_123';
      const entity = { classDayId } as unknown as ClassDayDomainEntity;
      const expected = { classDayId } as unknown as ClassDayDomainEntity;
      events.set(
        Topic.GotClassDayInfo,
        {} as EventPublisherBase<ClassDayDomainEntity>,
      );
      jest.spyOn(helpers, 'GetClassDayHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        classDay$: classDayDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getClassDay(classDayId);
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetClassDayHelper).toHaveBeenCalledWith(
        classDayId,
        classDayDomainService,
        events.get(Topic.GotClassDayInfo),
      );
    });
  });

  describe('getAllClassDays by group', () => {
    it('should return a class day array', async () => {
      // Arrange
      const groupId = 'group_123';
      const entities = [
        {
          classDayId: 'classDay-123',
        },
      ] as unknown as ClassDayDomainEntity[];
      const expected = [
        {
          classDayId: 'classDay-123',
        },
      ] as unknown as ClassDayDomainEntity[];
      events.set(
        Topic.GotClassDays,
        {} as EventPublisherBase<ClassDayDomainEntity>,
      );
      jest
        .spyOn(helpers, 'GetAllClassDaysByGroupHelper')
        .mockResolvedValue(entities);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        classDay$: classDayDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getAllClassDaysByGroup(
        groupId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetAllClassDaysByGroupHelper).toHaveBeenCalledWith(
        groupId,
        classDayDomainService,
        events.get(Topic.GotClassDays),
      );
    });
  });

  describe('getGroup', () => {
    it('should return a group', async () => {
      // Arrange
      const groupId = 'group_123';
      const entity = { groupId } as unknown as GroupDomainEntity;
      const expected = { groupId } as unknown as GroupDomainEntity;
      events.set(
        Topic.GotGroupInfo,
        {} as EventPublisherBase<GroupDomainEntity>,
      );
      jest.spyOn(helpers, 'GetGroupHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getGroup(groupId);
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetGroupHelper).toHaveBeenCalledWith(
        groupId,
        groupDomainService,
        events.get(Topic.GotGroupInfo),
      );
    });
  });

  describe('getAllGroups by inscription', () => {
    it('should return a group array', async () => {
      // Arrange
      const inscriptionId = 'inscription_123';
      const entities = [
        {
          groupId: 'group-123',
        },
      ] as unknown as GroupDomainEntity[];
      const expected = [
        {
          groupId: 'group-123',
        },
      ] as unknown as GroupDomainEntity[];
      events.set(Topic.GotGroups, {} as EventPublisherBase<GroupDomainEntity>);
      jest
        .spyOn(helpers, 'GetAllGroupsByInscriptionHelper')
        .mockResolvedValue(entities);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getAllGroupsByInscription(
        inscriptionId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetAllGroupsByInscriptionHelper).toHaveBeenCalledWith(
        inscriptionId,
        groupDomainService,
        events.get(Topic.GotGroups),
      );
    });
  });

  describe('getAllGroups by subject and semester', () => {
    it('should return a group array', async () => {
      // Arrange
      const subjectId = 'subject_123';
      const semesterId = 'semester_123';
      const entities = [
        {
          groupId: 'group-123',
        },
      ] as unknown as GroupDomainEntity[];
      const expected = [
        {
          groupId: 'group-123',
        },
      ] as unknown as GroupDomainEntity[];
      events.set(Topic.GotGroups, {} as EventPublisherBase<GroupDomainEntity>);
      jest.spyOn(helpers, 'GetAllGroupsHelper').mockResolvedValue(entities);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getAllGroups(
        subjectId,
        semesterId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetAllGroupsHelper).toHaveBeenCalledWith(
        subjectId,
        semesterId,
        groupDomainService,
        events.get(Topic.GotGroups),
      );
    });
  });

  describe('subscribeGroup', () => {
    it('should return a group', async () => {
      // Arrange
      const inscriptionId = 'inscription_123';
      const group = { groupId: 'group_123' } as unknown as GroupDomainEntity;
      const entity = group;
      const expected = { groupId: 'group_123' } as unknown as GroupDomainEntity;
      events.set(
        Topic.SubscribedGroup,
        {} as EventPublisherBase<GroupDomainEntity>,
      );
      jest.spyOn(helpers, 'SubscribeGroupHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.subscribeGroup(
        inscriptionId,
        group,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.SubscribeGroupHelper).toHaveBeenCalledWith(
        inscriptionId,
        group,
        groupDomainService,
        events.get(Topic.SubscribedGroup),
      );
    });
  });

  describe('unsubscribeGroup', () => {
    it('should return a group', async () => {
      // Arrange
      const inscriptionId = 'inscription_123';
      const groupId = 'group_123';
      const entity = { groupId } as unknown as GroupDomainEntity;
      const expected = { groupId } as unknown as GroupDomainEntity;
      events.set(
        Topic.UnsubscribedGroup,
        {} as EventPublisherBase<GroupDomainEntity>,
      );
      jest.spyOn(helpers, 'UnsubscribeGroupHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.unsubscribeGroup(
        inscriptionId,
        groupId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.UnsubscribeGroupHelper).toHaveBeenCalledWith(
        inscriptionId,
        groupId,
        groupDomainService,
        events.get(Topic.UnsubscribedGroup),
      );
    });
  });

  describe('getInscription', () => {
    it('should return a inscription', async () => {
      // Arrange
      const inscriptionId = 'inscription_123';
      const entity = { inscriptionId } as unknown as InscriptionDomainEntity;
      const expected = { inscriptionId } as unknown as InscriptionDomainEntity;
      events.set(
        Topic.GotInscriptionInfo,
        {} as EventPublisherBase<InscriptionDomainEntity>,
      );
      jest.spyOn(helpers, 'GetInscriptionHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        inscription$: inscriptionDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getInscription(
        inscriptionId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetInscriptionHelper).toHaveBeenCalledWith(
        inscriptionId,
        inscriptionDomainService,
        events.get(Topic.GotInscriptionInfo),
      );
    });
  });

  describe('getAllInscriptions by student', () => {
    it('should return an inscription array', async () => {
      // Arrange
      const studentId = 'student_123';
      const entities = [
        {
          inscriptionId: 'inscription-123',
        },
      ] as unknown as InscriptionDomainEntity[];
      const expected = [
        {
          inscriptionId: 'inscription-123',
        },
      ] as unknown as InscriptionDomainEntity[];
      events.set(
        Topic.GotInscriptions,
        {} as EventPublisherBase<InscriptionDomainEntity>,
      );
      jest
        .spyOn(helpers, 'GetAllInscriptionsByStudentHelper')
        .mockResolvedValue(entities);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        inscription$: inscriptionDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getAllInscriptionsByStudent(
        studentId,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetAllInscriptionsByStudentHelper).toHaveBeenCalledWith(
        studentId,
        inscriptionDomainService,
        events.get(Topic.GotInscriptions),
      );
    });
  });

  describe('changeInscriptionState', () => {
    it('should return a inscription', async () => {
      // Arrange
      const inscriptionId = 'inscription_123';
      const inscriptionState = 'active';
      const entity = { inscriptionId } as unknown as InscriptionDomainEntity;
      const expected = { inscriptionId } as unknown as InscriptionDomainEntity;
      events.set(
        Topic.ChangedInscriptionState,
        {} as EventPublisherBase<InscriptionDomainEntity>,
      );
      jest
        .spyOn(helpers, 'ChangeInscriptionStateHelper')
        .mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        inscription$: inscriptionDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.changeInscriptionState(
        inscriptionId,
        inscriptionState,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.ChangeInscriptionStateHelper).toHaveBeenCalledWith(
        inscriptionId,
        inscriptionState,
        inscriptionDomainService,
        events.get(Topic.ChangedInscriptionState),
      );
    });
  });

  describe('commitInscription', () => {
    it('should return an inscription', async () => {
      // Arrange
      const entity = { groups: [] } as unknown as InscriptionDomainEntity;
      const expected = { groups: [] } as unknown as InscriptionDomainEntity;
      events.set(
        Topic.CommittedInscription,
        {} as EventPublisherBase<InscriptionDomainEntity>,
      );
      events.set(
        Topic.SubscribedGroup,
        {} as EventPublisherBase<GroupDomainEntity>,
      );
      jest.spyOn(helpers, 'CommitInscriptionHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        inscription$: inscriptionDomainService,
        group$: groupDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.commitInscription(entity);
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.CommitInscriptionHelper).toHaveBeenCalledWith(
        entity,
        inscriptionDomainService,
        groupDomainService,
        events.get(Topic.CommittedInscription),
        events.get(Topic.SubscribedGroup),
      );
    });
  });

  describe('getSemester', () => {
    it('should return a semester', async () => {
      // Arrange
      const semesterId = 'semester_123';
      const entity = { semesterId } as unknown as SemesterDomainEntity;
      const expected = { semesterId } as unknown as SemesterDomainEntity;
      events.set(
        Topic.GotSemesterInfo,
        {} as EventPublisherBase<SemesterDomainEntity>,
      );
      jest.spyOn(helpers, 'GetSemesterHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        semester$: semesterDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getSemester(semesterId);
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetSemesterHelper).toHaveBeenCalledWith(
        semesterId,
        groupDomainService,
        events.get(Topic.GotSemesterInfo),
      );
    });
  });

  describe('getStudent', () => {
    it('should return a student', async () => {
      // Arrange
      const studentId = 'student_123';
      const entity = { studentId } as unknown as StudentDomainEntity;
      const expected = { studentId } as unknown as StudentDomainEntity;
      events.set(
        Topic.GotStudentInfo,
        {} as EventPublisherBase<StudentDomainEntity>,
      );
      jest.spyOn(helpers, 'GetStudentHelper').mockResolvedValue(entity);
      // Act
      const inscriptionAggregateRoot = new InscriptionAggregateRoot({
        student$: studentDomainService,
        events,
      });
      const result = await inscriptionAggregateRoot.getStudent(studentId);
      // Assert
      expect(result).toEqual(expected);
      expect(helpers.GetStudentHelper).toHaveBeenCalledWith(
        studentId,
        groupDomainService,
        events.get(Topic.GotStudentInfo),
      );
    });
  });
});
