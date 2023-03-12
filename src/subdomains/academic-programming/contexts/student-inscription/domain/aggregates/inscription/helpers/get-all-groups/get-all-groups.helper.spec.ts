import { GetAllGroupsHelper } from '.';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { AggregateRootException } from '@sofka/exceptions';

describe('GetAllClassDaysByGroupHelper function', () => {
  let subjectId: string;
  let semesterId: string;
  let serviceMock: IGroupDomainService;
  let eventMock: GotGroupsEventPublisher;
  let helper: typeof GetAllGroupsHelper;
  const allGroups = [
    {
      groupId: 'grupo_1',
    } as unknown as ClassDayDomainEntity,
    {
      groupId: 'grupo_2',
    } as unknown as ClassDayDomainEntity,
  ];

  beforeEach(() => {
    subjectId = 'grupo_123';
    semesterId = 'grupo_123';
    serviceMock = {
      getAllGroups: jest.fn().mockResolvedValue(allGroups),
    } as unknown as IGroupDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotGroupsEventPublisher;
    helper = GetAllGroupsHelper;
  });

  test('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () => helper(subjectId, semesterId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if GotGroupsEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotGroupsEventPublisher no recibido';
    // Act
    const result = () => helper(subjectId, semesterId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return an array of ClassDayDomainEntity and publish the event', async () => {
    // Arrange
    const expected = allGroups;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await helper(subjectId, semesterId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
