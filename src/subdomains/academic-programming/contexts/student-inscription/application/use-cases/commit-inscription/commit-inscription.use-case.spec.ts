jest.mock('@contexts/student-inscription/domain/value-objects');
import { CommitInscriptionUseCase } from '.';
import {
  ICommitInscriptionCommand,
  ICommittedInscriptionResponse,
} from '@contexts/student-inscription/domain/interfaces';
import {
  IGroupDomainService,
  IInscriptionDomainService,
  ISemesterDomainService,
  IStudentDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  SubscribedGroupEventPublisher,
  GotGroupInfoEventPublisher,
  GotStudentInfoEventPublisher,
  GotSemesterInfoEventPublisher,
  GotInscriptionsEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GroupIdValueObject } from '../../../domain/value-objects/group/group-id';
import { CommittedInscriptionEventPublisher } from '../../../domain/events/publishers/committed-inscription/committed-inscription.event-publisher';

describe('CommitInscriptionUseCase', () => {
  let useCase: CommitInscriptionUseCase;
  let inscriptionService: IInscriptionDomainService;
  let groupService: IGroupDomainService;
  let studentService: IStudentDomainService;
  let semesterService: ISemesterDomainService;
  let committedInscriptionEventPublisher: CommittedInscriptionEventPublisher;
  let gotGroupInfoEventPublisher: GotGroupInfoEventPublisher;
  let gotStudentInfoEventPublisher: GotStudentInfoEventPublisher;
  let gotSemesterInfoEventPublisher: GotSemesterInfoEventPublisher;
  let subscribedGroupEventPublisher: SubscribedGroupEventPublisher;
  let gotInscriptionsEventPublisher: GotInscriptionsEventPublisher;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;
  beforeEach(() => {
    groupService = {
      getGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    inscriptionService = {
      getInscription: jest.fn(),
    } as unknown as IInscriptionDomainService;
    studentService = {
      getStudent: jest.fn(),
    } as unknown as IStudentDomainService;
    semesterService = {
      getSemester: jest.fn(),
    } as unknown as ISemesterDomainService;
    committedInscriptionEventPublisher = {
      publish: jest.fn(),
    } as unknown as CommittedInscriptionEventPublisher;
    gotGroupInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotGroupInfoEventPublisher;
    gotStudentInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotStudentInfoEventPublisher;
    gotSemesterInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotSemesterInfoEventPublisher;
    subscribedGroupEventPublisher = {
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    gotInscriptionsEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotInscriptionsEventPublisher;
    const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const semesterId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    inscriptionAggregateRootMock = {
      getStudent: jest.fn().mockReturnValue({ studentId }),
      getSemester: jest.fn().mockReturnValue({ semesterId }),
      commitInscription: jest.fn().mockReturnValue({
        inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
      } as unknown as GroupDomainEntity),
    } as unknown as InscriptionAggregateRoot;
    useCase = new CommitInscriptionUseCase(
      inscriptionService,
      groupService,
      studentService,
      semesterService,
      committedInscriptionEventPublisher,
      gotGroupInfoEventPublisher,
      gotStudentInfoEventPublisher,
      gotSemesterInfoEventPublisher,
      subscribedGroupEventPublisher,
      gotInscriptionsEventPublisher,
    );
  });

  it('should commit a new inscription', async () => {
    // Arrange
    const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const semesterId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupIds = ['ee896699-6ab1-4fb7-bfce-9c4715ed7488'];
    const command: ICommitInscriptionCommand = {
      studentId,
      semesterId,
      groupIds,
    };
    const inscription = {
      inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
    } as unknown as GroupDomainEntity;
    jest
      .spyOn(useCase as any, 'createEntityInscription')
      .mockReturnValue(inscription);
    // Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: ICommittedInscriptionResponse = await useCase.execute(
      command,
    );
    // Assert
    expect(inscriptionAggregateRootMock.commitInscription).toHaveBeenCalledWith(
      inscription,
    );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(inscription);
  });

  it('should commit a new inscription', async () => {
    // Arrange
    const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const semesterId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupIds = ['ee896699-6ab1-4fb7-bfce-9c4715ed7488'];
    const command: ICommitInscriptionCommand = {
      studentId,
      semesterId,
      groupIds,
    };
    const inscription = {
      inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
    } as unknown as GroupDomainEntity;
    jest
      .spyOn(useCase as any, 'executeAggregateRoot')
      .mockReturnValue(inscription);
    // Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: ICommittedInscriptionResponse = await useCase.execute(
      command,
    );
    // Assert
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(inscription);
  });

  it('should throw an exception if there are errors in the command like undefined', async () => {
    // Arrange
    const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command = {
      studentId,
    } as unknown as ICommitInscriptionCommand;
    const valueObject = new GroupIdValueObject('ss');
    // Act
    jest
      .spyOn(useCase as any, 'createValueObjects')
      .mockReturnValue([valueObject]);
    jest.spyOn(valueObject, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const result = () => useCase.execute(command);
    // Assert
    await expect(result).rejects.toThrow(ValueObjectException);
  });

  it('should throw an exception if there are errors in the command', async () => {
    // Arrange
    const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const semesterId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupIds = ['ee896699-6ab1-4fb7-bfce-9c4715ed7488'];
    const command: ICommitInscriptionCommand = {
      studentId,
      semesterId,
      groupIds,
    };
    const expectedMessage = 'Existen algunos errores en el comando';
    const valueObject = new GroupIdValueObject('ss');
    // Act
    jest
      .spyOn(useCase as any, 'createValueObjects')
      .mockReturnValue([valueObject]);
    jest.spyOn(valueObject, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const result = () => useCase.execute(command);
    // Act & Assert
    await expect(result).rejects.toThrow(ValueObjectException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  describe('objectValue errors', () => {
    it('should throw an error if InscriptionIdValueObject has errors', async () => {
      // Arrange
      const studentId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
      const semesterId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
      const groupIds = ['ee896699-6ab1-4fb7-bfce-9c4715ed7488'];
      const command: ICommitInscriptionCommand = {
        studentId,
        semesterId,
        groupIds,
      };
      const valueObject = new GroupIdValueObject('ss');
      // Act
      jest
        .spyOn(useCase as any, 'createValueObjects')
        .mockReturnValue([valueObject]);
      jest.spyOn(valueObject, 'hasErrors').mockReturnValue(true);
      Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
        value: inscriptionAggregateRootMock,
      });
      const executePromise = useCase.execute(command);
      // Assert
      await expect(executePromise).rejects.toThrow(ValueObjectException);
      // await expect(executePromise).rejects.toThrow(expectedMessage);
    });
  });
});
