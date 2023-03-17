jest.mock('@contexts/student-inscription/domain/value-objects');
import { GetInscriptionInfoUseCase } from '.';
import {
  IGetInscriptionInfoCommand,
  IGotInscriptionInfoResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { GotInscriptionInfoEventPublisher } from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain';
import { IErrorValueObject } from '@sofka/interfaces';

describe('GetInscriptionInfoUseCase', () => {
  let useCase: GetInscriptionInfoUseCase;
  let inscriptionService: IInscriptionDomainService;
  let gotInscriptionInfoEventPublisher: GotInscriptionInfoEventPublisher;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;
  beforeEach(() => {
    inscriptionService = {
      getInscription: jest.fn(),
    } as unknown as IInscriptionDomainService;
    gotInscriptionInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotInscriptionInfoEventPublisher;
    inscriptionAggregateRootMock = {
      getInscription: jest.fn().mockReturnValue({
        inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
      }),
    } as unknown as InscriptionAggregateRoot;
    useCase = new GetInscriptionInfoUseCase(
      gotInscriptionInfoEventPublisher,
      inscriptionService,
    );
  });

  it('should get a inscription', async () => {
    // Arrange
    const inscriptionId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command: IGetInscriptionInfoCommand = { inscriptionId };
    const inscription = { inscriptionId } as unknown as InscriptionDomainEntity;
    // Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'inscriptionAggregateRoot', {
      value: inscriptionAggregateRootMock,
    });
    const response: IGotInscriptionInfoResponse = await useCase.execute(
      command,
    );
    // Assert
    expect(inscriptionAggregateRootMock.getInscription).toHaveBeenCalledWith(
      command.inscriptionId.valueOf(),
    );
    expect(inscriptionAggregateRootMock.getInscription).toHaveBeenCalledWith(
      inscriptionId.valueOf(),
    );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(inscription);
  });

  it('should throw an exception if there are errors in the command like undefined', async () => {
    // Arrange
    const command = { undefined } as unknown as IGetInscriptionInfoCommand;
    const valueObject = new InscriptionIdValueObject('ss');
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
    const command: IGetInscriptionInfoCommand = { inscriptionId };
    const expectedMessage = 'Existen algunos errores en el comando';
    const valueObject = new InscriptionIdValueObject('ss');
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
    it('should throw an error if InscriptionIdValueObject has errors', async () => {
      // Arrange
      const expectedMessage = 'Existen algunos errores en el comando';
      const command: IGetInscriptionInfoCommand = {
        inscriptionId: 'ee896699-6ab1-4fb7-bfce-9c4715ed7488',
      };
      const valueObject = new InscriptionIdValueObject('ss');
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
