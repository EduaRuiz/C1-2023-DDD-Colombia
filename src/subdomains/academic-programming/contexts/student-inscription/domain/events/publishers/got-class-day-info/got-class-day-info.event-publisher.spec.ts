import { GotClassDayInfoEventPublisher } from '.';
import { ClassDayDomainEntity } from '../../../entities';
import { Topic } from '../enums/topic.enum';

describe('GotClassDayInfoEventPublisher', () => {
  class MockEventPublisher extends GotClassDayInfoEventPublisher {}
  let eventPublisher: MockEventPublisher;
  let publisher: {
    emit: jest.Mock;
    send: jest.Mock;
  };

  describe('publish', () => {
    beforeEach(() => {
      publisher = {
        emit: jest.fn(),
        send: jest.fn(),
      };
      eventPublisher = new MockEventPublisher(publisher);
      eventPublisher.response = {} as ClassDayDomainEntity;
    });

    it('should be defined', () => {
      expect(eventPublisher).toBeDefined();
    });

    it('should emit an event with the response', async () => {
      // Arrange
      const expectedChannel = Topic.GotClassDayInfo;
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
