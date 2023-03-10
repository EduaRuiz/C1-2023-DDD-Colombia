import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
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
      const inscriptions = await service.getAllInscriptionsByStudent(
        inscription.student.studentId.valueOf(),
      );
      const semesterExist = inscriptions.find(
        (totalInscriptions) =>
          totalInscriptions.semester.semesterId.valueOf() ===
          inscription.semester.semesterId.valueOf(),
      );
      if (semesterExist && semesterExist.inscriptionState !== 'cancelled') {
        throw new AggregateRootException(
          'El estudiante ya cuenta con una inscripción activa para el semestre informado',
        );
      }
      const currentGroups: GroupDomainEntity[] = [];
      if (inscription.groups.length === 0) {
        throw new AggregateRootException(
          'Para registrar una inscripción la misma debe tener al menos un grupo',
        );
      }
      inscription.groups.map((group) => {
        canSuscribeGroup(currentGroups, group);
        currentGroups.push(group);
      });
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
