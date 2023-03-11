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
      canSuscribeGroup(groups, group);
      event.response = await service.subscribeGroup(inscriptionId, group);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo SubscribedGroupEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};

/**
 * Valida si se puede inscribir a un grupo según los grupos actuales
 * por lo que comprueba que el estado permita la inscripción, si el grupo no se repite,
 * si hay cupos disponibles, si la materia del grupo ya se ve en otro grupo
 *
 * @param {GroupDomainEntity[]} currentGroups Lista de grupos inscritos
 * @param {GroupDomainEntity} newGroup Nuevo grupo a inscribir
 */
const canSuscribeGroup = (
  currentGroups: GroupDomainEntity[],
  newGroup: GroupDomainEntity,
): void => {
  if (newGroup.quoteAvailable.valueOf() !== 0) {
    throw new AggregateRootException('No se puede inscribir grupos sin cupos');
  }
  if (newGroup.groupState.valueOf() !== 'Open') {
    throw new AggregateRootException(
      'No se puede inscribir grupos no abiertos',
    );
  }

  currentGroups.map((currentGroup) => {
    if (currentGroup.groupId === newGroup.groupId) {
      throw new AggregateRootException(
        'No se puede inscribir grupos ya inscritos',
      );
    }
    if (currentGroup.subjectId === newGroup.subjectId) {
      throw new AggregateRootException(
        'No se pueden inscribir grupos con la misma materia ya inscritas en otros grupos',
      );
    }
    if (!scheduleAvailable(newGroup, currentGroup)) {
      throw new AggregateRootException(
        'No se puede inscribir grupos que se cruzan en horarios con otros grupos ya inscritos',
      );
    }
  });
};

/**
 * Valida que el horario del nuevo grupo no se cruce con el horario del grupo existente
 *
 * @param {GroupDomainEntity} newGroup Nuevo grupo
 * @param {GroupDomainEntity} currentGroup Grupo inscrito
 * @return {boolean}
 */
const scheduleAvailable = (
  newGroup: GroupDomainEntity,
  currentGroup: GroupDomainEntity,
): boolean => {
  newGroup.classDays.map((newClassDay) => {
    currentGroup.classDays.map((currentClassDay) => {
      if (currentClassDay.weekDay.valueOf() === newClassDay.weekDay.valueOf()) {
        if (
          currentClassDay.startTime.valueOf() <= newClassDay.startTime.valueOf()
        ) {
          const finishTime =
            currentClassDay.startTime.valueOf() +
            currentClassDay.duration.valueOf() / 60;
          if (finishTime > newClassDay.startTime.valueOf()) {
            return false;
          }
        } else {
          const finishTime =
            newClassDay.startTime.valueOf() +
            newClassDay.duration.valueOf() / 60;
          if (finishTime > currentClassDay.startTime.valueOf()) {
            return false;
          }
        }
      }
    });
  });
  return true;
};
