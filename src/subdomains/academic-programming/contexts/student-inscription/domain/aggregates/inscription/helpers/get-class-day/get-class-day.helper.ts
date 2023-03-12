import { ClassDayDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IClassDayDomainService } from '@contexts/student-inscription/domain/services';
import { GotClassDayInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae el dia de clase asociado
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} classDayId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IClassDayDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotClassDayInfoEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<ClassDayDomainEntity>} Retorna el objeto producto de la acción
 */
export const GetClassDayHelper = async (
  classDayId: string,
  service?: IClassDayDomainService,
  event?: GotClassDayInfoEventPublisher,
): Promise<ClassDayDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.getClassDay(classDayId);
      event.publish();
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotClassDayInfoEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IClassDayDomainService no recibido',
  );
};
