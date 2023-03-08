import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { GotInscriptionInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae la inscripción asociada
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} inscriptionId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotInscriptionInfoEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<InscriptionDomainEntity>} Retorna el objeto producto de la acción
 */
export const GetInscriptionHelper = async (
  inscriptionId: string,
  service?: IInscriptionDomainService,
  event?: GotInscriptionInfoEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.getInscription(inscriptionId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotInscriptionInfoEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IInscriptionDomainService no recibido',
  );
};
