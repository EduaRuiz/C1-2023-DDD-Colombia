import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae el grupo asociado
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} groupId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IGroupDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotGroupInfoEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<GroupDomainEntity>} Retorna el objeto producto de la acción
 */
export const GetGroupHelper = async (
  groupId: string,
  service?: IGroupDomainService,
  event?: GotGroupInfoEventPublisher,
): Promise<GroupDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.getGroup(groupId);
      event.publish();
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotGroupInfoEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};
