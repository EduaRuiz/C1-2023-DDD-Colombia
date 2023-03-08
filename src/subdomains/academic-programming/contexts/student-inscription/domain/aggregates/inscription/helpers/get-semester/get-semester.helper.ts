import { SemesterDomainEntity } from '@contexts/student-inscription/domain/entities';
import { ISemesterDomainService } from '@contexts/student-inscription/domain/services';
import { GotSemesterInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que ejecuta el cambio de estado de una inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} semesterId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {ISemesterDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotSemesterInfoEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<SemesterDomainEntity>} Retorna el objeto producto de la acción
 */
export const GetSemesterHelper = async (
  semesterId: string,
  service?: ISemesterDomainService,
  event?: GotSemesterInfoEventPublisher,
): Promise<SemesterDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.getSemester(semesterId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotSemesterInfoEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo ISemesterDomainService no recibido',
  );
};
