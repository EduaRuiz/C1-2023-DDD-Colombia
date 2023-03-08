import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que ejecuta el registro a un nuevo grupo
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {GroupDomainEntity} group Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IGroupDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {SubscribedGroupEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<GroupDomainEntity>} Retorna el objeto producto de la acción
 */
export const SubscribeGroupHelper = async (
  group: GroupDomainEntity,
  service?: IGroupDomainService,
  event?: SubscribedGroupEventPublisher,
): Promise<GroupDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.subscribeGroup(group);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo SubscribedGroupEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};
