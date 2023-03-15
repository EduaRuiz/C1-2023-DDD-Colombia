import { GotSemesterInfoEventPublisher } from '..';
import { SemesterDomainEntity } from '../../../entities';
import { Topic } from '../enums/topic.enum';

describe('GotSemesterInfoEventPublisher', () => {
  class MockEventPublisher extends GotSemesterInfoEventPublisher {}
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
      eventPublisher.response = {} as SemesterDomainEntity;
    });

    it('should be defined', () => {
      expect(eventPublisher).toBeDefined();
    });

    it('should emit an event with the response', async () => {
      // Arrange
      const expectedChannel = Topic.GotSemesterInfo;
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
