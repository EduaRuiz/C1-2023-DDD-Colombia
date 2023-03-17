jest.mock('@contexts/student-inscription/domain/value-objects');
import { AddGroupUseCase } from '.';
import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import {
  SubscribedGroupEventPublisher,
  GotGroupInfoEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GroupIdValueObject } from '../../../domain/value-objects/group/group-id';

describe('AddGroupUseCase', () => {
  let useCase: AddGroupUseCase;
  let groupService: IGroupDomainService;
  let subscribedGroupEventPublisher: SubscribedGroupEventPublisher;
  let gotGroupInfoEventPublisher: GotGroupInfoEventPublisher;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;
  beforeEach(() => {
    groupService = {
      getGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    subscribedGroupEventPublisher = {
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    gotGroupInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotGroupInfoEventPublisher;
    inscriptionAggregateRootMock = {
      getGroup: jest
        .fn()
        .mockReturnValue({ groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488' }),
      subscribeGroup: jest
        .fn()
        .mockReturnValue({ groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488' }),
    } as unknown as InscriptionAggregateRoot;
    useCase = new AddGroupUseCase(
      groupService,
      subscribedGroupEventPublisher,
      gotGroupInfoEventPublisher,
    );
  });

  it('should add a new group to an inscription', async () => {
    // Arrange
    const inscriptionId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command: IAddGroupCommand = { inscriptionId, groupId };
    const group = { groupId: groupId } as unknown as GroupDomainEntity;
    // Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: IAddedGroupResponse = await useCase.execute(command);
    // Assert
    expect(inscriptionAggregateRootMock.getGroup).toHaveBeenCalledWith(
      command.groupId.valueOf(),
    );
    expect(inscriptionAggregateRootMock.subscribeGroup).toHaveBeenCalledWith(
      inscriptionId.valueOf(),
      group,
    );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(group);
  });

  it('should throw an exception if there are errors in the command like undefined', async () => {
    // Arrange
    const groupId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command = { undefined, groupId } as unknown as IAddGroupCommand;
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
    const inscriptionId = 'uuid';
    const groupId = 'uuid';
    const command: IAddGroupCommand = { inscriptionId, groupId };
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
      const expectedMessage = 'Existen algunos errores en el comando';
      const command: IAddGroupCommand = {
        inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
        groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
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
      await expect(executePromise).rejects.toThrow(expectedMessage);
    });
  });
});
