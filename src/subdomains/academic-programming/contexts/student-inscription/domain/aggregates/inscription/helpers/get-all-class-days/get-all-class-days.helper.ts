import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';
import { GotClassDaysEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae la lista de días de clase asociados al grupo
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} groupId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IClassDayDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotClassDaysEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<ClassDayDomainEntity[]>} Retorna el objeto producto de la acción
 */
export const GetAllClassDaysHelper = async (
  groupId: string,
  service?: IClassDayDomainService,
  event?: GotClassDaysEventPublisher,
): Promise<ClassDayDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllClassDays(groupId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotClassDaysEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IClassDayDomainService no recibido',
  );
};
