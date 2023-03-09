import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { SubscribedGroupEventPublisher } from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que ejecuta el registro a un nuevo grupo
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} inscriptionId UUID de la inscripción a la cual se relacionara el grupo
 * @param {GroupDomainEntity} group Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IGroupDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {SubscribedGroupEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<GroupDomainEntity>} Retorna el objeto producto de la acción
 */
export const SubscribeGroupHelper = async (
  inscriptionId: string,
  group: GroupDomainEntity,
  service?: IGroupDomainService,
  event?: SubscribedGroupEventPublisher,
): Promise<GroupDomainEntity> => {
  if (service) {
    if (event) {
      const groups = await service.getAllGroupsByInscription(inscriptionId);
      canSuscribeGroup(groups);
      const inscription = group.inscription;
      if (inscription) {
        const groups = inscription.groups;
        if (groups) {
          for (const g of groups) {
            if (g.groupId) {
              if (g.groupId === group.groupId) {
                throw new AggregateRootException(
                  'No se puede inscribir un grupo que ya existente',
                );
              }
              if (g.classDays) {
                const classDays = g.classDays;
              }
            }
          }
          event.response = await service.subscribeGroup(inscriptionId, group);
          event.publish;
          return event.response;
        }
        throw new AggregateRootException(
          'La entidad inscripción debe contener grupos asociados',
        );
      }
      throw new AggregateRootException(
        'El grupo a registrar debe tener la inscripción a relacionar asociada en la entidad',
      );
    }
    throw new AggregateRootException(
      'Evento del tipo SubscribedGroupEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};

const canSuscribeGroup = (groups: GroupDomainEntity[]): boolean => {
  return true;
};
