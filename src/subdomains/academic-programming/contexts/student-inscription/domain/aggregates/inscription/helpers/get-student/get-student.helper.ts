import { StudentDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IStudentDomainService } from '@contexts/student-inscription/domain/services';
import { GotStudentInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';

/**
 * Función ayudante que trae el estudiante asociado
 * Lanza los errores correspondientes al envió de campos indefinidos
 *
 * @param {string} studentId Contiene la información y estructura suficientes y necesarios para realizar la acción
 * @param {IStudentDomainService} [service] Servicio usado para la ejecución de la acción
 * @param {GotStudentInfoEventPublisher} [event] Evento publicador de la acción realizado en el canal correspondiente
 * @return {Promise<StudentDomainEntity>} Retorna el objeto producto de la acción
 */
export const GetStudentHelper = async (
  studentId: string,
  service?: IStudentDomainService,
  event?: GotStudentInfoEventPublisher,
): Promise<StudentDomainEntity> => {
  if (service) {
    if (event) {
      event.response = await service.getStudent(studentId);
      event.publish();
      return event.response;
    }
    throw new AggregateRootException(
      'Evento del tipo GotStudentInfoEventPublisher no recibido',
    );
  }
  throw new AggregateRootException(
    'Servicio del tipo IStudentDomainService no recibido',
  );
};
