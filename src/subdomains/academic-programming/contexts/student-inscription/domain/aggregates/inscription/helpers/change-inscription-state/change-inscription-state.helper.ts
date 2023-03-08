import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { ChangedInscriptionStateEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

/**
 * Función ayudante que ejecuta el cambio de estado de una inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {InscriptionDomainEntity} inscription Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {ChangedInscriptionStateEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<InscriptionDomainEntity>} Retorna el objeto producto de la acción
 */
export const ChangeInscriptionStateHelper = async (
  inscription: InscriptionDomainEntity,
  service?: IInscriptionDomainService,
  event?: ChangedInscriptionStateEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.changeInscriptionState(inscription);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo ChangedInscriptionStateEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IInscriptionDomainService no recibido',
  );
};
