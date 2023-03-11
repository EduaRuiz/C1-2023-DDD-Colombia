import { GroupDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IGroupDomainService } from '@contexts/student-inscription/domain/services';
import { GotGroupsEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae la lista de grupos asociados a la inscripción
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} subjectId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {string} semesterId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IGroupDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotGroupsEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<GroupDomainEntity[]>} Retorna el objeto producto de la acción
 */
export /**
 *
 *
 * @param {string} subjectId
 * @param {string} semesterId
 * @param {IGroupDomainService} [service]
 * @param {GotGroupsEventPublisher} [event]
 * @return {*}  {Promise<GroupDomainEntity[]>}
 */
const GetAllGroupsHelper = async (
  subjectId: string,
  semesterId: string,
  service?: IGroupDomainService,
  event?: GotGroupsEventPublisher,
): Promise<GroupDomainEntity[]> => {
  if (service) {
    if (event) {
      event.response = await service.getAllGroups(subjectId, semesterId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotGroupsEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IGroupDomainService no recibido',
  );
};
