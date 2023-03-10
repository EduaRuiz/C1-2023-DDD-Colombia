import { SubscribeGroupHelper } from './subscribe-group.helper';
import { GroupDomainEntity, ClassDayDomainEntity } from '../../../../entities';
import { IGroupDomainService } from '../../../../services/group.domain-service';
import { SubscribedGroupEventPublisher } from '../../../../events/publishers/subscribed-group.event-publisher';

describe('SubscribeGroupHelper', () => {
  let helper: any;
  let group: GroupDomainEntity;
  let service: IGroupDomainService;
  let event: SubscribedGroupEventPublisher;

  beforeEach(() => {
    group = {
      groupId: '9d2e0de1-1c25-4168-bc3e-88802f24c453',
      classDays: [] as ClassDayDomainEntity[],
      subjectName: 'Math',
      subjectId: '03453f3a-597f-4e44-8e58-d23b97cdbd08',
      professorName: 'Dylan',
      quoteAvailable: 40,
      groupState: 'Open ',
    } as GroupDomainEntity;
    helper = SubscribeGroupHelper;
    service = {
      getAllGroupsByInscription: jest.fn(),
      subscribeGroup: jest.fn(),
    } as unknown as IGroupDomainService;
    event = {
      response: 123,
      publish: jest.fn(),
    } as unknown as SubscribedGroupEventPublisher;
    helper('123', group, service, event);
  });

  it('definido', () => {
    expect(helper).toBeDefined();
  });

  it('una prueba', () => {
    
  });

});
