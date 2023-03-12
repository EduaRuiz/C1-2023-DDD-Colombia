jest.mock('../');
import * as helpers from '../';
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
  SubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';
import { SubscribeGroupHelper } from '../subscribe-group/subscribe-group.helper';
import { CommitInscriptionHelper } from './commit-inscription.helper';

describe('CommitInscriptionHelper', () => {
  let inscription: InscriptionDomainEntity;
  let inscriptionService: IInscriptionDomainService;
  let groupService: IGroupDomainService;
  let committedInscription: CommittedInscriptionEventPublisher;
  let subscribedGroup: SubscribedGroupEventPublisher;
  let helper: typeof SubscribeGroupHelper;

  beforeEach(() => {
    inscription = {
      groups: [{ groupId: 'aaaa' }, { groupId: 'bbbb' }],
      student: { studentId: 'ssss' },
    } as unknown as InscriptionDomainEntity;
    inscriptionService = {
      getAllInscriptionsByStudent: jest.fn(),
      commitInscription: jest.fn(),
    } as unknown as IInscriptionDomainService;
    groupService = {} as unknown as IGroupDomainService;
    committedInscription = {
      response: null,
      publish: jest.fn(),
    } as unknown as CommittedInscriptionEventPublisher;
    subscribedGroup = {
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    helper = SubscribeGroupHelper;
  });

  describe('when all required dependencies are provided', () => {
    describe('when inscription has at least one group', () => {
      it('should register the inscription and subscribe to the groups', async () => {
        // Arrange
        const group1 = { groupId: 'aaaa' } as unknown as GroupDomainEntity;
        const group2 = { groupId: 'aaaa' } as unknown as GroupDomainEntity;
        inscription.groups = [group1, group2];

        const inscriptionSaved = inscription;
        inscriptionSaved.inscriptionId = '123';

        inscriptionService.getAllInscriptionsByStudent = jest
          .fn()
          .mockResolvedValue([]);
        inscriptionService.commitInscription = jest
          .fn()
          .mockResolvedValue(inscriptionSaved);

        const subscribedGroup1 = group1;
        const subscribedGroup2 = group2;
        jest.spyOn(helpers, 'SubscribeGroupHelper').mockResolvedValue(group1);

        // Act
        const result = await CommitInscriptionHelper(
          inscription,
          inscriptionService,
          groupService,
          committedInscription,
          subscribedGroup,
        );

        // Assert
        expect(result).toEqual(inscriptionSaved);
        expect(inscriptionService.commitInscription).toHaveBeenCalledWith(
          inscription,
        );
        expect(helper).toHaveBeenCalledWith(
          inscriptionSaved.inscriptionId,
          group1,
          groupService,
          subscribedGroup,
        );
        expect(helper).toHaveBeenCalledWith(
          inscriptionSaved.inscriptionId,
          group2,
          groupService,
          subscribedGroup,
        );
        expect(committedInscription.response).toEqual(inscriptionSaved);
      });

      it('should throw an error if inscription registration fails', async () => {
        // Arrange
        const group1 = { groupId: 'aaaa' } as unknown as GroupDomainEntity;
        const group2 = { groupId: 'aaaa' } as unknown as GroupDomainEntity;
        inscription.groups = [group1, group2];

        inscriptionService.getAllInscriptionsByStudent = jest
          .fn()
          .mockResolvedValue([]);
        inscriptionService.commitInscription = jest
          .fn()
          .mockRejectedValue(new AggregateRootException('Inscription failed'));

        // Act & Assert
        await expect(
          CommitInscriptionHelper(
            inscription,
            inscriptionService,
            groupService,
            committedInscription,
            subscribedGroup,
          ),
        ).rejects.toThrow(AggregateRootException);
        expect(groupService).not.toHaveBeenCalled();
        expect(subscribedGroup.publish).not.toHaveBeenCalled();
        expect(committedInscription.response).toBeNull();
      });
    });

    describe('when inscription has no groups', () => {
      it('should not register the inscription and should not subscribe to any group', async () => {
        // Arrange
        inscription.groups = [];

        // Act
        const result = await CommitInscriptionHelper(
          inscription,
          inscriptionService,
          groupService,
          committedInscription,
          subscribedGroup,
        );

        // Assert
        expect(result).toBeNull();
        expect(inscriptionService.commitInscription).not.toHaveBeenCalled();
        expect(groupService).not.toHaveBeenCalled();
        expect(subscribedGroup.publish).not.toHaveBeenCalled();
        expect(committedInscription.response).toBeNull();
      });
    });
  });

  describe('when some dependency is not provided', () => {
    it('should throw an error', async () => {
      // Act & Assert
      await expect(
        CommitInscriptionHelper(
          inscription,
          undefined,
          groupService,
          committedInscription,
          subscribedGroup,
        ),
      ).rejects.toThrow();
      await expect(
        CommitInscriptionHelper(
          inscription,
          inscriptionService,
          undefined,
          committedInscription,
          subscribedGroup,
        ),
      ).rejects.toThrow();
      await expect(
        CommitInscriptionHelper(
          inscription,
          inscriptionService,
          groupService,
          undefined,
          subscribedGroup,
        ),
      ).rejects.toThrow();
      await expect(
        CommitInscriptionHelper(
          inscription,
          inscriptionService,
          groupService,
          committedInscription,
          undefined,
        ),
      ).rejects.toThrow();
    });
  });
});
