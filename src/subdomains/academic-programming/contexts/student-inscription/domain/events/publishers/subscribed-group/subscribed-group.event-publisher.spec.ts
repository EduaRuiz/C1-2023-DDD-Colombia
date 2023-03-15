import { SubscribedGroupEventPublisher } from '..';
import { GroupDomainEntity } from '../../../entities';
import { Topic } from '../enums/topic.enum';

describe('SubscribedGroupEventPublisher', () => {
  class MockEventPublisher extends SubscribedGroupEventPublisher {}
  let eventPublisher: MockEventPublisher;
  let publisher: {
    send: jest.Mock;
    emit: jest.Mock;
  };

  describe('publish', () => {
    beforeEach(() => {
      publisher = {
        send: jest.fn(),
        emit: jest.fn(),
      };
      eventPublisher = new MockEventPublisher(publisher);
      eventPublisher.response = {} as GroupDomainEntity;
    });

    it('should be defined', () => {
      expect(eventPublisher).toBeDefined();
    });

    it('should emit an event with the response', async () => {
      // Arrange
      const expectedChannel = Topic.SubscribedGroup;
      const expectedPayload = JSON.stringify(eventPublisher.response);
      publisher.emit.mockResolvedValue('success');
      // Act
      const result = await eventPublisher.publish();
      // Assert
      expect(publisher.emit).toHaveBeenCalledWith(
        expectedChannel,
        expectedPayload,
      );
      expect(result).toEqual('success');
    });
  });
});
