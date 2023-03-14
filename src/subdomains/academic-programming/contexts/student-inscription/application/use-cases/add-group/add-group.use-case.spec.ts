import { AddGroupUseCase } from '.';
import {
  IAddGroupCommand,
  IAddedGroupResponse,
} from '@contexts/student-inscription/domain/interfaces';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GroupIdValueObject } from '@contexts/student-inscription/domain/value-objects/group';
import { InscriptionIdValueObject } from '@contexts/student-inscription/domain/value-objects/inscription';
import {
  SubscribedGroupEventPublisher,
  GotGroupInfoEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { InscriptionAggregateRoot } from '@contexts/student-inscription/domain/aggregates';
import { ValueObjectException } from '@sofka/exceptions';
import { Topic } from '@contexts/student-inscription/domain/events/publishers/enums';
import { EventPublisherBase } from '@sofka/bases';
import { GroupDomainEntity } from '../../../domain/entities/group.domain-entity';

describe('AddGroupUseCase', () => {
  let useCase: AddGroupUseCase;
  let groupService: IGroupDomainService;
  let subscribedGroupEventPublisher: SubscribedGroupEventPublisher;
  let gotGroupInfoEventPublisher: GotGroupInfoEventPublisher;
  let aggregateRootMock: jest.Mocked<any>;
  let inscriptionAggregateRootMock: InscriptionAggregateRoot;

  beforeEach(() => {
    groupService = {
      getGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    subscribedGroupEventPublisher = {
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    gotGroupInfoEventPublisher = {
      publish: jest.fn(),
    } as unknown as GotGroupInfoEventPublisher;
    // aggregateRootMock.subscribeGroup.mockResolvedValue({
    //   id: new GroupIdValueObject('group123'),
    //   subject: 'math',
    //   teacher: 'John Doe',
    // });
    inscriptionAggregateRootMock = {
      getGroup: jest.fn().mockReturnValue({ groupId: 'aaa' }),
      subscribeGroup: jest.fn().mockReturnValue({ groupId: 'aaa' }),
    } as unknown as InscriptionAggregateRoot;
    useCase = new AddGroupUseCase(
      groupService,
      subscribedGroupEventPublisher,
      gotGroupInfoEventPublisher,
    );
    // jest
    //   .spyOn(useCase, 'setAggregate')
    //   .mockImplementation(() => inscriptionAggregateRootMock.getGroup);
  });
  jest
    .spyOn(AddGroupUseCase.prototype, 'setAggregate')
    .mockReturnValue(aggregateRootMock);

  it('should add a new group to an inscription', async () => {
    // Arrange
    const inscriptionId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const groupId = 'ee896699-6ab1-4fb7-bfce-9c4715ed7488';
    const command: IAddGroupCommand = { inscriptionId, groupId };
    const group = { id: groupId } as unknown as GroupDomainEntity;
    // const aggregateRoot = new InscriptionAggregateRoot({
    //   group$: groupService,
    //   events: new Map<Topic, EventPublisherBase<any>>(),
    // });
    // const subscribeGroupSpy = jest
    //   .spyOn(aggregateRoot, 'subscribeGroup')
    //   .mockResolvedValue(group);
    // Act
    useCase.setAggregate(inscriptionAggregateRootMock);
    const response: IAddedGroupResponse = await useCase.execute(command);

    // Assert
    // expect(subscribeGroupSpy).toHaveBeenCalledWith(
    //   inscriptionId.valueOf(),
    //   group,
    // );
    expect(response.success).toBeTruthy();
    expect(response.data).toEqual(group);
  });

  it('should throw an exception if there are errors in the command', async () => {
    // Arrange
    const inscriptionId = '';
    const groupId = 'group123';
    const command: IAddGroupCommand = { inscriptionId, groupId };

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow(
      ValueObjectException,
    );
  });
});
