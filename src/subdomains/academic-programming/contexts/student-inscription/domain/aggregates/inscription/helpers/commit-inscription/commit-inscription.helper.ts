import {
  GroupDomainEntity,
  InscriptionDomainEntity,
} from '@contexts/student-inscription/domain/entities';
import {
  IGroupDomainService,
  IInscriptionDomainService,
} from '@contexts/student-inscription/domain/services';
import {
  CommittedInscriptionEventPublisher,
  SubscribedGroupEventPublisher,
} from '@contexts/student-inscription/domain/events';
import { AggregateRootException } from '@sofka/exceptions';
import { SubscribeGroupHelper } from '../subscribe-group/subscribe-group.helper';

/**
 * Función ayudante que ejecuta el guardado o registro una nueva inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {InscriptionDomainEntity} inscription Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IInscriptionDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {IGroupDomainService} [groupService] Servicio usado para la actualización de los grupos
 * @param {CommittedInscriptionEventPublisher} [committedInscription] Evento publicador de la acción realizado en el canal correspondiente
 * @param {SubscribedGroupEventPublisher} [subscribedGroup] Evento publicador de la asignación por grupo
 * @return {Promise<InscriptionDomainEntity>} Retorna el objeto producto de la acción
 */
export /**
 *
 *
 * @param {InscriptionDomainEntity} inscription
 * @param {IInscriptionDomainService} [inscriptionService]
 * @param {IGroupDomainService} [groupService]
 * @param {CommittedInscriptionEventPublisher} [committedInscription]
 * @param {SubscribedGroupEventPublisher} [subscribedGroup]
 * @return {*}  {Promise<InscriptionDomainEntity>}
 */
const CommitInscriptionHelper = async (
  inscription: InscriptionDomainEntity,
  inscriptionService?: IInscriptionDomainService,
  groupService?: IGroupDomainService,
  committedInscription?: CommittedInscriptionEventPublisher,
  subscribedGroup?: SubscribedGroupEventPublisher,
): Promise<InscriptionDomainEntity> => {
  if (inscriptionService) {
    if (groupService) {
      if (committedInscription) {
        if (subscribedGroup) {
          const inscriptions =
            await inscriptionService.getAllInscriptionsByStudent(
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
          const currentGroups = inscription.groups;
          inscription.groups = [];
          if (inscription.groups.length === 0) {
            throw new AggregateRootException(
              'Para registrar una inscripción la misma debe tener al menos un grupo',
            );
          }
          const inscriptionSaved = await inscriptionService.commitInscription(
            inscription,
          );
          const inscriptionId = inscriptionSaved.inscriptionId;
          if (!inscriptionId) {
            throw new AggregateRootException('Id inscripcion indefinido');
          }
          const groupsUpdated: GroupDomainEntity[] = [];
          currentGroups.map(async (group) => {
            groupsUpdated.push(
              await SubscribeGroupHelper(
                inscriptionId.valueOf(),
                group,
                groupService,
                subscribedGroup,
              ),
            );
          });
          inscriptionSaved.groups = groupsUpdated;
          committedInscription.response = inscriptionSaved;
          committedInscription.publish;
          return committedInscription.response;
        }
        throw new AggregateRootException(
          'Evento del tipo CommittedInscriptionEventPublisher no recibido',
        );
      }
      throw new AggregateRootException(
        'Evento del tipo SubscribedGroupEventPublisher no recibido',
      );
    }
    throw new AggregateRootException(
      'Servicio del tipo IGroupDomainService no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IInscriptionDomainService no recibido',
  );
};
