import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';
import { GotClassDayInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetClassDayHelper } from '.';

describe('GetClassDayHelper function', () => {
  let classDayId: string;
  let serviceMock: IClassDayDomainService;
  let eventMock: GotClassDayInfoEventPublisher;
  const classDay = {
    classDayId: 'class_day_123',
  } as unknown as ClassDayDomainEntity;

  beforeEach(() => {
    classDayId = 'class_day_123';
    serviceMock = {
      getClassDay: jest.fn().mockResolvedValue(classDay),
    } as unknown as IClassDayDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotClassDayInfoEventPublisher;
  });

  test('should throw an error if IClassDayDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo IClassDayDomainService no recibido';
    // Act
    const result = () => GetClassDayHelper(classDayId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if GotClassDayInfoEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotClassDayInfoEventPublisher no recibido';
    // Act
    const result = () => GetClassDayHelper(classDayId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return a ClassDayDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = classDay;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetClassDayHelper(classDayId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
