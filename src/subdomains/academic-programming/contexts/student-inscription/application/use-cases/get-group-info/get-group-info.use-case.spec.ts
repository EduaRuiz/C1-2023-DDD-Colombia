jest.mock('@contexts/student-inscription/domain/value-objects');
import { GetGroupInfoUseCase } from '.';
import {
  IGetGroupInfoCommand,
  IGotGroupInfoResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupInfoEventPublisher } from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GroupIdValueObject } from '../../../domain/value-objects/group/group-id';
import { IErrorValueObject } from '@sofka/interfaces';

describe('GetGroupInfoUseCase', () => {
  let useCase: GetGroupInfoUseCase;
  let groupService: IGroupDomainService;
  let gotGroupInfoEventPublisher: GotGroupInfoEventPublisher;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;
  beforeEach(() => {
    groupService = {
      getGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    gotGroupInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotGroupInfoEventPublisher;
    inscriptionAggregateRootMock = {
      getGroup: jest
        .fn()
        .mockReturnValue({ groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488' }),
    } as unknown as InscriptionAggregateRoot;
    useCase = new GetGroupInfoUseCase(gotGroupInfoEventPublisher, groupService);
  });

  it('should get a group', async () => {
    // Arrange
    const groupId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command: IGetGroupInfoCommand = { groupId };
    const group = { groupId } as unknown as GroupDomainEntity;
    // Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: IGotGroupInfoResponse = await useCase.execute(command);
    // Assert
    expect(inscriptionAggregateRootMock.getGroup).toHaveBeenCalledWith(
      command.groupId.valueOf(),
    );
    expect(inscriptionAggregateRootMock.getGroup).toHaveBeenCalledWith(
      groupId.valueOf(),
    );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(group);
  });

  it('should throw an exception if there are errors in the command like undefined', async () => {
    // Arrange
    const command = { undefined } as unknown as IGetGroupInfoCommand;
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
    const groupId = 'uuid';
    const command: IGetGroupInfoCommand = { groupId };
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

  describe('objectValue errors', () => {
    it('should throw an error if GroupIdValueObject has errors', async () => {
      // Arrange
      const expectedMessage = 'Existen algunos errores en el comando';
      const command: IGetGroupInfoCommand = {
        groupId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
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
