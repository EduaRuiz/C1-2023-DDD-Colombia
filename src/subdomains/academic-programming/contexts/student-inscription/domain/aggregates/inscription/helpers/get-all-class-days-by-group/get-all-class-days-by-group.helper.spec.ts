import { GetAllClassDaysByGroupHelper } from '.';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';
import { GotClassDaysEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { AggregateRootException } from '@sofka/exceptions';

describe('GetAllClassDaysByGroupHelper function', () => {
  let groupId: string;
  let serviceMock: IClassDayDomainService;
  let eventMock: GotClassDaysEventPublisher;
  let helper: typeof GetAllClassDaysByGroupHelper;
  const allClassDays = [
    {
      classDayId: 'clase_1',
    } as unknown as ClassDayDomainEntity,
    {
      classDayId: 'clase_2',
    } as unknown as ClassDayDomainEntity,
  ];

  beforeEach(() => {
    groupId = 'grupo_123';
    serviceMock = {
      getAllClassDaysByGroup: jest.fn().mockResolvedValue(allClassDays),
    } as unknown as IClassDayDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotClassDaysEventPublisher;
    helper = GetAllClassDaysByGroupHelper;
  });

  it('should throw an error if IClassDayDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo IClassDayDomainService no recibido';
    // Act
    const result = () => helper(groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if GotClassDaysEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotClassDaysEventPublisher no recibido';
    // Act
    const result = () => helper(groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should return an array of ClassDayDomainEntity and publish the event', async () => {
    // Arrange
    const expected = allClassDays;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await helper(groupId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
