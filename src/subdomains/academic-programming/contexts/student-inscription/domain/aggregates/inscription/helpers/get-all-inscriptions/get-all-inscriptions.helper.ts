import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { GotInscriptionsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae la lista total de inscripciones por estudiante
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} studentId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotInscriptionsEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<InscriptionDomainEntity[]>} Retorna el objeto producto de la acción
 */
export const GetAllInscriptionsHelper = async (
  studentId: string,
  service?: IInscriptionDomainService,
  event?: GotInscriptionsEventPublisher,
): Promise<InscriptionDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllInscriptions(studentId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotInscriptionsEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IInscriptionDomainService no recibido',
  );
};
