import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetGroupHelper } from '.';

describe('GetGroupHelper function', () => {
  let groupId: string;
  let serviceMock: IGroupDomainService;
  let eventMock: GotGroupInfoEventPublisher;
  const group = {
    groupId: 'group_123',
  } as unknown as GroupDomainEntity;

  beforeEach(() => {
    groupId = 'group_123';
    serviceMock = {
      getGroup: jest.fn().mockResolvedValue(group),
    } as unknown as IGroupDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotGroupInfoEventPublisher;
  });

  test('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () => GetGroupHelper(groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if GotGroupInfoEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotGroupInfoEventPublisher no recibido';
    // Act
    const result = () => GetGroupHelper(groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return a GroupDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = group;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetGroupHelper(groupId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
