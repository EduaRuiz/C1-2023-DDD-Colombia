import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { GotInscriptionsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetAllInscriptionsByStudentHelper } from '.';

describe('GetAllInscriptionsByStudentHelper function', () => {
  let studentId: string;
  let serviceMock: IInscriptionDomainService;
  let eventMock: GotInscriptionsEventPublisher;
  const allInscriptions = [
    {
      inscriptionId: 'inscription_1',
    } as unknown as InscriptionDomainEntity,
    {
      inscriptionId: 'inscription_2',
    } as unknown as InscriptionDomainEntity,
  ];

  beforeEach(() => {
    studentId = 'student_123';
    serviceMock = {
      getAllInscriptionsByStudent: jest.fn().mockResolvedValue(allInscriptions),
    } as unknown as IInscriptionDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotInscriptionsEventPublisher;
  });

  it('should throw an error if IInscriptionDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo IInscriptionDomainService no recibido';
    // Act
    const result = () =>
      GetAllInscriptionsByStudentHelper(studentId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if GotInscriptionsEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotInscriptionsEventPublisher no recibido';
    // Act
    const result = () =>
      GetAllInscriptionsByStudentHelper(studentId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should return an array of InscriptionDomainEntity and publish the event', async () => {
    // Arrange
    const expected = allInscriptions;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetAllInscriptionsByStudentHelper(
      studentId,
      service,
      event,
    );
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
