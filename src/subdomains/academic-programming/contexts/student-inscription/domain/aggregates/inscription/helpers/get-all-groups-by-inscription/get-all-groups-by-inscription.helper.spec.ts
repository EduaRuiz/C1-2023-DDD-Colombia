import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetAllGroupsByInscriptionHelper } from '.';

describe('GetAllGroupsByInscriptionHelper function', () => {
  let inscriptionId: string;
  let serviceMock: IGroupDomainService;
  let eventMock: GotGroupsEventPublisher;
  const allGroups = [
    {
      groupId: 'grupo_1',
    } as unknown as GroupDomainEntity,
    {
      groupId: 'grupo_2',
    } as unknown as GroupDomainEntity,
  ];

  beforeEach(() => {
    inscriptionId = 'inscription_123';
    serviceMock = {
      getAllGroupsByInscription: jest.fn().mockResolvedValue(allGroups),
    } as unknown as IGroupDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotGroupsEventPublisher;
  });

  test('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () =>
      GetAllGroupsByInscriptionHelper(inscriptionId, service, event);
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
    const result = () =>
      GetAllGroupsByInscriptionHelper(inscriptionId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return an array of GroupDomainEntity and publish the event', async () => {
    // Arrange
    const expected = allGroups;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetAllGroupsByInscriptionHelper(
      inscriptionId,
      service,
      event,
    );
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
