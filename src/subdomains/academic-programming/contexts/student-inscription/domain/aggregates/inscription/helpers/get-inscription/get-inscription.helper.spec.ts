import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { GotInscriptionInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetInscriptionHelper } from '.';

describe('GetInscriptionHelper function', () => {
  let inscriptionId: string;
  let serviceMock: IInscriptionDomainService;
  let eventMock: GotInscriptionInfoEventPublisher;
  const inscription = {
    inscriptionId: 'inscription_123',
  } as unknown as InscriptionDomainEntity;

  beforeEach(() => {
    inscriptionId = 'inscription_123';
    serviceMock = {
      getInscription: jest.fn().mockResolvedValue(inscription),
    } as unknown as IInscriptionDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotInscriptionInfoEventPublisher;
  });

  test('should throw an error if IInscriptionDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo IInscriptionDomainService no recibido';
    // Act
    const result = () => GetInscriptionHelper(inscriptionId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if GotInscriptionInfoEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotInscriptionInfoEventPublisher no recibido';
    // Act
    const result = () => GetInscriptionHelper(inscriptionId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return an InscriptionDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = inscription;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetInscriptionHelper(inscriptionId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
