import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { UnsubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

/**
 * Función ayudante que ejecuta el dada de baja de un grupo
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} inscriptionId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {string} groupId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IGroupDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {UnsubscribedGroupEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<GroupDomainEntity>} Retorna el objeto producto de la acción
 */
export const UnsubscribeGroupHelper = async (
  inscriptionId: string,
  groupId: string,
  service?: IGroupDomainService,
  event?: UnsubscribedGroupEventPublisher,
): Promise<GroupDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.unsubscribeGroup(inscriptionId, groupId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo UnsubscribedGroupEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};
