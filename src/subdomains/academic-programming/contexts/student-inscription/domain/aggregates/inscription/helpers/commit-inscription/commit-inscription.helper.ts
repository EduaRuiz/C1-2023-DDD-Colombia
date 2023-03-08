import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { CommittedInscriptionEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que ejecuta el guardado o registro una nueva inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {InscriptionDomainEntity} inscription Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {CommittedInscriptionEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<InscriptionDomainEntity>} Retorna el objeto producto de la acción
 */
export const CommitInscriptionHelper = async (
  inscription: InscriptionDomainEntity,
  service?: IInscriptionDomainService,
  event?: CommittedInscriptionEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.commitInscription(inscription);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo CommittedInscriptionEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IInscriptionDomainService no recibido',
  );
};
