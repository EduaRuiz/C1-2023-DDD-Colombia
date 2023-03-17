import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { ISemesterDomainService } from '@contexts/student-inscription/domain/services';
import { GotSemesterInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetSemesterHelper } from '.';

describe('GetSemesterHelper function', () => {
  let semesterId: string;
  let serviceMock: ISemesterDomainService;
  let eventMock: GotSemesterInfoEventPublisher;
  const semester = {
    semesterId: 'semester_123',
  } as unknown as SemesterDomainEntity;

  beforeEach(() => {
    semesterId = 'semester_123';
    serviceMock = {
      getSemester: jest.fn().mockResolvedValue(semester),
    } as unknown as ISemesterDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotSemesterInfoEventPublisher;
  });

  it('should throw an error if ISemesterDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo ISemesterDomainService no recibido';
    // Act
    const result = () => GetSemesterHelper(semesterId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if GotSemesterInfoEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotSemesterInfoEventPublisher no recibido';
    // Act
    const result = () => GetSemesterHelper(semesterId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should return a SemesterDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = semester;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetSemesterHelper(semesterId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
