jest.mock('@contexts/student-inscription/domain/value-objects');
import { GetGroupsForInscriptionUseCase } from '.';
import {
  IGetGroupsForInscriptionCommand,
  IGotGroupsForInscriptionResponse,
  ISubjectIdExist,
} from '@contexts/student-inscription/domain/interfaces';
import {
  IGroupDomainService,
  ISubjectIdExistDomainService,
} from '@contexts/student-inscription/domain/services';
import { GotGroupsEventPublisher } from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GroupIdValueObject } from '../../../domain/value-objects/group/group-id';
import { IErrorValueObject } from '@sofka/interfaces';

describe('GetGroupsForInscriptionUseCase', () => {
  let useCase: GetGroupsForInscriptionUseCase;
  let groupService: IGroupDomainService;
  let gotGroupsEventPublisher: GotGroupsEventPublisher;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;
  let subjectIdExistDomainService: ISubjectIdExistDomainService;
  beforeEach(() => {
    groupService = {
      getGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    subjectIdExistDomainService = {
      exist: jest.fn(),
    } as unknown as ISubjectIdExistDomainService;
    gotGroupsEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotGroupsEventPublisher;
    inscriptionAggregateRootMock = {
      getAllGroups: jest
        .fn()
        .mockReturnValue([{ groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488' }]),
    } as unknown as InscriptionAggregateRoot;
    useCase = new GetGroupsForInscriptionUseCase(
      gotGroupsEventPublisher,
      groupService,
      subjectIdExistDomainService,
    );
  });

  it('should get a group', async () => {
    // Arrange
    const subjectId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupState = 'open';
    const command: IGetGroupsForInscriptionCommand = { subjectId, groupState };
    const groups = [
      { groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488' },
    ] as unknown as GroupDomainEntity[];
    const exist = true as unknown as ISubjectIdExist;
    // Act
    jest.spyOn(subjectIdExistDomainService, 'exist').mockResolvedValue(exist);
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: IGotGroupsForInscriptionResponse = await useCase.execute(
      command,
    );
    // Assert
    expect(inscriptionAggregateRootMock.getAllGroups).toHaveBeenCalledWith(
      command.subjectId.valueOf(),
      command.groupState.valueOf(),
    );
    expect(inscriptionAggregateRootMock.getAllGroups).toHaveBeenCalledWith(
      command.subjectId.valueOf(),
      command.groupState.valueOf(),
    );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(groups);
  });

  it('should throw an exception if there are errors in the command like undefined', async () => {
    // Arrange
    const command = { undefined } as unknown as IGetGroupsForInscriptionCommand;
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
  });

  it('should throw an exception if there are errors in the command', async () => {
    // Arrange
    const subjectId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupState = 'open';
    const command: IGetGroupsForInscriptionCommand = { subjectId, groupState };
    const expectedMessage = 'Existen algunos errores en el comando';
    const valueObject = new GroupIdValueObject('ss');
    // Act
    jest
      .spyOn(useCase as any, 'createValueObjects')
      .mockReturnValue([valueObject]);
    jest.spyOn(valueObject, 'hasErrors').mockReturnValue(true);
    jest
      .spyOn(valueObject, 'getErrors')
      .mockReturnValue(['sss' as unknown as IErrorValueObject]);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const result = () => useCase.execute(command);
    // Act & Assert
    await expect(result).rejects.toThrow(ValueObjectException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an exception if the subjectId does not exist', async () => {
    // Arrange
    const subjectId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupState = 'open';
    const command: IGetGroupsForInscriptionCommand = { subjectId, groupState };
    const expectedMessage = 'El SubjectId suministrado no existe';
    const exist = false as unknown as ISubjectIdExist;
    // Act
    jest.spyOn(subjectIdExistDomainService, 'exist').mockResolvedValue(exist);
    const result = () => useCase.execute(command);
    // Act & Assert
    await expect(result).rejects.toThrow(ValueObjectException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  describe('objectValue errors', () => {
    it('should throw an error if GroupIdValueObject has errors', async () => {
      // Arrange
      const expectedMessage = 'Existen algunos errores en el comando';
      const subjectId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
      const groupState = 'open';
      const command: IGetGroupsForInscriptionCommand = {
        subjectId,
        groupState,
      };
      const valueObject = new GroupIdValueObject('ss');
      // Act
      jest
        .spyOn(useCase as any, 'createValueObjects')
        .mockReturnValue([valueObject]);
      jest.spyOn(valueObject, 'hasErrors').mockReturnValue(true);
      jest
        .spyOn(valueObject, 'getErrors')
        .mockReturnValue(['sss' as unknown as IErrorValueObject]);
      Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
        value: inscriptionAggregateRootMock,
      });
      const executePromise = useCase.execute(command);
      // Assert
      await expect(executePromise).rejects.toThrow(ValueObjectException);
      await expect(executePromise).rejects.toThrow(expectedMessage);
    });
  });
});
