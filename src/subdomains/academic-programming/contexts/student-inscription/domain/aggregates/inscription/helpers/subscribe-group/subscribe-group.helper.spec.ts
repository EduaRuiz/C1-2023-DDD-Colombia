import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';
import { SubscribeGroupHelper, scheduleAvailable } from '.';
import { ClassDayDomainEntity } from '../../../../entities/class-day.domain-entity';

describe('SubscribeGroupHelper function', () => {
  let inscriptionId: string;
  let group: GroupDomainEntity;
  let currentGroups: GroupDomainEntity[];
  let serviceMock: IGroupDomainService;
  let eventMock: SubscribedGroupEventPublisher;

  beforeEach(() => {
    inscriptionId = 'inscription_123';
    group = {
      groupId: 'group_123',
      subjectId: 'subject_123',
      classDays: [
        {
          weekDay: 'L',
          startTime: 7,
          duration: 120,
        },
        {
          weekDay: 'MC',
          startTime: 7,
          duration: 120,
        },
      ],
      groupState: 'Open',
      quoteAvailable: 5,
    } as unknown as GroupDomainEntity;
    currentGroups = [
      {
        groupId: 'group_456',
        subjectId: 'subject_456',
        classDays: [
          {
            weekDay: 'L',
            startTime: 11,
            duration: 120,
          },
          {
            weekDay: 'MC',
            startTime: 11,
            duration: 120,
          },
        ],
        groupState: 'Open',
        quoteAvailable: 5,
      } as unknown as GroupDomainEntity,
      {
        groupId: 'group_789',
        subjectId: 'subject_789',
        classDays: [
          {
            weekDay: 'M',
            startTime: 7,
            duration: 120,
          },
          {
            weekDay: 'J',
            startTime: 7,
            duration: 120,
          },
        ],
        groupState: 'Open',
        quoteAvailable: 5,
      } as unknown as GroupDomainEntity,
      {
        groupId: 'group_012',
        subjectId: 'subject_012',
        classDays: [
          {
            weekDay: 'M',
            startTime: 9,
            duration: 120,
          },
          {
            weekDay: 'J',
            startTime: 9,
            duration: 120,
          },
        ],
        groupState: 'Open',
        quoteAvailable: 5,
      } as unknown as GroupDomainEntity,
    ];
    serviceMock = {
      getAllGroupsByInscription: jest.fn().mockResolvedValue([]),
      subscribeGroup: jest.fn().mockResolvedValue(group),
    } as unknown as IGroupDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
  });

  test('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if SubscribedGroupEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo SubscribedGroupEventPublisher no recibido';
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if group has no available quotes', async () => {
    // Arrange
    group.quoteAvailable = 0;
    const expectedMessage = 'No se puede inscribir grupos sin cupos';
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if group is not open', async () => {
    // Arrange
    group.groupState = 'Closed';
    const expectedMessage = 'No se puede inscribir grupos no abiertos';
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if group is already subscribed', async () => {
    // Arrange
    const expectedMessage = 'No se puede inscribir grupos ya inscritos';
    const groups = [...currentGroups, group];
    const service = {
      ...serviceMock,
      getAllGroupsByInscription: jest.fn().mockResolvedValue(groups),
    } as unknown as IGroupDomainService;
    const event = eventMock;
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if there is another group with the same subject already subscribed', async () => {
    // Arrange
    const expectedMessage =
      'No se pueden inscribir grupos con la misma materia ya inscritas en otros grupos';
    const groups = [{ ...currentGroups, ...group, groupId: 'group_456' }];
    const service = {
      ...serviceMock,
      getAllGroupsByInscription: jest.fn().mockResolvedValue(groups),
    } as unknown as IGroupDomainService;
    const event = eventMock;
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if the group to subscribe conflicts with other groups', async () => {
    // Arrange
    group.classDays = [
      {
        weekDay: 'L',
        startTime: 11,
        duration: 120,
      },
      {
        weekDay: 'MC',
        startTime: 11,
        duration: 120,
      },
    ] as unknown as ClassDayDomainEntity[];
    const expectedMessage =
      'No se puede inscribir grupos que se cruzan en horarios con otros grupos ya inscritos';
    serviceMock.getAllGroupsByInscription = jest
      .fn()
      .mockResolvedValue(currentGroups);
    // Act
    const result = () =>
      SubscribeGroupHelper(inscriptionId, group, serviceMock, eventMock);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return a GroupDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = group;
    serviceMock.getAllGroupsByInscription = jest
      .fn()
      .mockResolvedValue(currentGroups);
    serviceMock.subscribeGroup = jest.fn().mockResolvedValue(group);
    // Act
    const result = await SubscribeGroupHelper(
      inscriptionId,
      group,
      serviceMock,
      eventMock,
    );
    // Assert
    expect(result).toEqual(expected);
    expect(eventMock.publish).toHaveBeenCalled();
  });
});

describe('scheduleAvailable function', () => {
  test('should return true if the schedules do not conflict', () => {
    // Arrange
    const newGroup = {
      classDays: [
        {
          weekDay: 2,
          startTime: new Date('2023-03-14T11:00:00Z'),
          duration: 120,
        },
        {
          weekDay: 4,
          startTime: new Date('2023-03-16T11:00:00Z'),
          duration: 120,
        },
      ],
    } as unknown as GroupDomainEntity;
    const currentGroup = {
      classDays: [
        {
          weekDay: 1,
          startTime: new Date('2023-03-13T10:00:00Z'),
          duration: 120,
        },
        {
          weekDay: 3,
          startTime: new Date('2023-03-15T10:00:00Z'),
          duration: 120,
        },
      ],
    } as unknown as GroupDomainEntity;
    // Act
    const result = scheduleAvailable(newGroup, currentGroup);
    // Assert
    expect(result).toBeTruthy();
  });
  test('should return false if the schedules do conflict', () => {
    // Arrange
    const newGroup = {
      classDays: [
        {
          weekDay: 'L',
          startTime: 5,
          duration: 120,
        },
        {
          weekDay: 'M',
          startTime: 5,
          duration: 120,
        },
      ],
    } as unknown as GroupDomainEntity;
    const currentGroup = {
      classDays: [
        {
          weekDay: 'L',
          startTime: 5,
          duration: 120,
        },
        {
          weekDay: 'V',
          startTime: 5,
          duration: 120,
        },
      ],
    } as unknown as GroupDomainEntity;
    // Act
    const result = scheduleAvailable(newGroup, currentGroup);
    // Assert
    expect(result).toBeFalsy();
  });
});
