import { AggregateRootException } from '@sofka/exceptions';
import { StudentDomainEntity } from '@contexts/student-inscription/domain/entities';
import { GotStudentInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { IStudentDomainService } from '@contexts/student-inscription/domain/services';

export const GetStudentHelper = async (
  studentId: string,
  service?: IStudentDomainService,
  event?: GotStudentInfoEventPublisher,
): Promise<StudentDomainEntity> => {
  if (event) {
    if (service) {
      event.response = await service.getStudent(studentId);
      event.publish;
      return event.response;
    }
    throw new AggregateRootException('');
  }
  throw new AggregateRootException('');
};
