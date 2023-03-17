// jest.mock('../');
import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
import {
  IGroupDomainService,
  IInscriptionDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  CommittedInscriptionEventPublisher,
  GotInscriptionsEventPublisher,
  SubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';
import { CommitInscriptionHelper } from '.';
import * as helpers from '../';
jest.mock('../subscribe-group/subscribe-group.helper');

describe('CommitInscriptionHelper', () => {
  let group: GroupDomainEntity;
  let inscription: InscriptionDomainEntity;
  let inscriptionService: IInscriptionDomainService;
  let groupService: IGroupDomainService;
  let committedInscriptionEvent: CommittedInscriptionEventPublisher;
  let subscribedGroupEvent: SubscribedGroupEventPublisher;
  let gotInscriptionsEventPublisher: GotInscriptionsEventPublisher;

  beforeEach(() => {
    group = {
      groupId: 'group_123',
    } as unknown as GroupDomainEntity;
    inscription = {
      student: {
        studentId: 'student_123',
      },
      semester: {
        semesterId: 'semester_123',
      },
      groups: [
        {
          groupId: 'group_123',
        },
      ],
    } as unknown as InscriptionDomainEntity;
    inscriptionService = {
      getAllInscriptionsByStudent: jest.fn().mockResolvedValue([]),
      commitInscription: jest.fn().mockResolvedValue({
        ...inscription,
        inscriptionId: 'inscription_123',
      }),
    } as unknown as IInscriptionDomainService;
    groupService = {
      getGroupById: jest.fn().mockResolvedValue({}),
      subscribeGroup: jest.fn().mockResolvedValue({}),
    } as unknown as IGroupDomainService;
    committedInscriptionEvent = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as CommittedInscriptionEventPublisher;
    subscribedGroupEvent = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    gotInscriptionsEventPublisher = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotInscriptionsEventPublisher;
    // inscriptionService = inscriptionServiceMock;
    // groupService = groupServiceMock;
    // committedInscriptionEvent = committedInscriptionEventMock;
    // subscribedGroupEvent = subscribedGroupEventMock;
  });

  it('should throw an error if IInscriptionDomainService is not received', async () => {
    // Arrange
    const inscriptionService = undefined;
    const expectedMessage =
      'Servicio del tipo IInscriptionDomainService no recibido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if IGroupDomainService is not received', async () => {
    // Arrange
    const groupService = undefined;
    const expectedMessage = 'Servicio del tipo IGroupDomainService no recibido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if CommittedInscriptionEventPublisher is not received', async () => {
    // Arrange
    const committedInscriptionEvent = undefined;
    const expectedMessage =
      'Evento del tipo CommittedInscriptionEventPublisher no recibido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if SubscribedGroupEventPublisher is not received', async () => {
    // Arrange
    const subscribedGroupEvent = undefined;
    const expectedMessage =
      'Evento del tipo SubscribedGroupEventPublisher no recibido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if the student already has an active inscription for the semester', async () => {
    // Arrange
    const expectedMessage =
      'El estudiante ya cuenta con una inscripción activa para el semestre informado';
    inscriptionService.getAllInscriptionsByStudent = jest
      .fn()
      .mockResolvedValue([
        {
          inscriptionId: 'inscription_123',
          semester: {
            semesterId: 'semester_123',
          },
          inscriptionState: 'active',
        },
      ] as unknown as InscriptionDomainEntity);
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should throw an error if inscriptionId is undefined after commit', async () => {
    // Arrange
    inscriptionService.commitInscription = jest.fn().mockResolvedValue({
      inscriptionId: undefined,
    } as unknown as InscriptionDomainEntity);
    const expectedMessage = 'Id inscripcion indefinido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
        gotInscriptionsEventPublisher,
      );
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  it('should call SubscribeGroupHelper for each group and return updated inscription', async () => {
    // Arrange
    const inscriptionSaved = {
      ...inscription,
      inscriptionId: 'inscription_456',
      groups: [],
    } as unknown as InscriptionDomainEntity;
    inscriptionService.commitInscription = jest
      .fn()
      .mockResolvedValue(inscriptionSaved);
    jest.spyOn(helpers, 'SubscribeGroupHelper').mockResolvedValue(group);
    const expected = {
      ...inscriptionSaved,
      groups: [group],
    };
    const expectedGroupUpdated = group;
    expectedGroupUpdated.groupId = 'group_456';
    groupService.getAllGroupsByInscription = jest
      .fn()
      .mockResolvedValue([expectedGroupUpdated]);
    subscribedGroupEvent.response = expectedGroupUpdated;
    // Act
    const result = await CommitInscriptionHelper(
      inscription,
      inscriptionService,
      groupService,
      committedInscriptionEvent,
      subscribedGroupEvent,
      gotInscriptionsEventPublisher,
    );
    // Assert
    expect(result).toEqual(expected);
    expect(committedInscriptionEvent.publish).toHaveBeenCalledTimes(1);
    expect(committedInscriptionEvent.publish).toHaveBeenCalledWith();
  });

  it('should throw an error if there is an error subscribing a group', async () => {
    // Arrange
    const expectedMessage =
      'Evento del tipo GotInscriptionsEventPublisher no recibido';
    // Act
    const result = () =>
      CommitInscriptionHelper(
        inscription,
        inscriptionService,
        groupService,
        committedInscriptionEvent,
        subscribedGroupEvent,
      );
    // Assert
    await expect(result).rejects.toThrow(new Error(expectedMessage));
    expect(committedInscriptionEvent.publish).not.toHaveBeenCalled();
  });

  // it('should call commitInscription and SubscribeGroupHelper functions and return the committed inscription', async () => {
  //   // Arrange
  //   const expected = {
  //     ...inscription,
  //     inscriptionId: 'inscription_123',
  //   } as InscriptionDomainEntity;
  //   // inscriptionService.commitInscription = jest.fn().mockResolvedValue({
  //   //   inscriptionId: '12545',
  //   // });
  //   const subscribeGroupHelperMock = jest.fn().mockResolvedValue(group);
  //   jest
  //     .spyOn(helpers, 'SubscribeGroupHelper')
  //     .mockImplementation(subscribeGroupHelperMock);
  //   // Act
  //   const result = () =>
  //     CommitInscriptionHelper(
  //       inscription,
  //       inscriptionService,
  //       groupService,
  //       committedInscriptionEvent,
  //       subscribedGroupEvent,
  //       gotInscriptionsEventPublisher,
  //     );
  //   // Assert
  //   await expect(result).toEqual(expected);
  //   expect(inscriptionService.commitInscription).toHaveBeenCalledTimes(1);
  //   expect(inscriptionService.commitInscription).toHaveBeenCalledWith(
  //     inscription,
  //   );
  //   expect(subscribeGroupHelperMock).toHaveBeenCalledTimes(1);
  //   // expect(subscribeGroupHelperMock).toHaveBeenCalledWith(
  //   //   result.inscriptionId,
  //   //   group,
  //   //   groupService,
  //   //   subscribedGroupEvent,
  //   // );
  //   expect(committedInscriptionEvent.publish).toHaveBeenCalledTimes(1);
  // });
});
