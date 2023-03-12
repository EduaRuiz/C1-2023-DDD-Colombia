import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { ChangedInscriptionStateEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

/**
 * Función ayudante que ejecuta el cambio de estado de una inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} inscriptionId UUID de la inscripción a cambiar estado
 * @param {string} inscriptionState nuevo estado
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {ChangedInscriptionStateEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<InscriptionDomainEntity>} Retorna el objeto producto de la acción
 */
export const ChangeInscriptionStateHelper = async (
  inscriptionId: string,
  inscriptionState: string,
  service?: IInscriptionDomainService,
  event?: ChangedInscriptionStateEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (service) {
    if (event) {
      const currentInscription = await service.getInscription(inscriptionId);
      if (
        currentInscription.inscriptionState.valueOf() === 'cancelled' ||
        currentInscription.inscriptionState.valueOf() === 'completed'
      ) {
        throw new AggregateRootException(
          'No se puede actualizar el estado de una inscripción completada o cancelada',
        );
      }
      event.response = await service.changeInscriptionState(
        inscriptionId,
        inscriptionState,
      );
      event.publish();
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
