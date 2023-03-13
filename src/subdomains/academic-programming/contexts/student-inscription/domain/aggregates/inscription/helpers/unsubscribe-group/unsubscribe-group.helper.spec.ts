import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { UnsubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';
import { UnsubscribeGroupHelper } from '.';

describe('UnsubscribeGroupHelper function', () => {
  let inscriptionId: string;
  let groupId: string;
  let serviceMock: IGroupDomainService;
  let eventMock: UnsubscribedGroupEventPublisher;
  const group = {
    groupId: 'group_123',
  } as unknown as GroupDomainEntity;

  beforeEach(() => {
    inscriptionId = 'inscription_123';
    groupId = 'group_123';
    serviceMock = {
      getAllGroupsByInscription: jest.fn().mockResolvedValue([group]),
      unsubscribeGroup: jest.fn().mockResolvedValue(group),
    } as unknown as IGroupDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as UnsubscribedGroupEventPublisher;
  });

  test('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () =>
      UnsubscribeGroupHelper(inscriptionId, groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if UnsubscribedGroupEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo UnsubscribedGroupEventPublisher no recibido';
    // Act
    const result = () =>
      UnsubscribeGroupHelper(inscriptionId, groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if there is only one group in the inscription', async () => {
    // Arrange
    const expectedMessage =
      'no se puede remover el grupo siendo este el único dentro de la inscripción';
    const groups = [group];
    const service = {
      ...serviceMock,
      getAllGroupsByInscription: jest.fn().mockResolvedValue(groups),
    } as unknown as IGroupDomainService;
    const event = eventMock;
    // Act
    const result = () =>
      UnsubscribeGroupHelper(inscriptionId, groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if the group to unsubscribe does not exist in the inscription', async () => {
    // Arrange
    groupId = 'another';
    const expectedMessage =
      'El grupo que se intenta dar de baja no existe en la inscripción';
    const groups = [group];
    const service = {
      ...serviceMock,
      getAllGroupsByInscription: jest.fn().mockResolvedValue(groups),
    } as unknown as IGroupDomainService;
    const event = eventMock;
    // Act
    const result = () =>
      UnsubscribeGroupHelper(inscriptionId, groupId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return a GroupDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = group;
    const groups = [group, { groupId: 'ddddd' }];
    const event = eventMock;
    const service = {
      ...serviceMock,
      getAllGroupsByInscription: jest.fn().mockResolvedValue(groups),
    } as unknown as IGroupDomainService;
    // Act
    const result = await UnsubscribeGroupHelper(
      inscriptionId,
      groupId,
      service,
      event,
    );
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
