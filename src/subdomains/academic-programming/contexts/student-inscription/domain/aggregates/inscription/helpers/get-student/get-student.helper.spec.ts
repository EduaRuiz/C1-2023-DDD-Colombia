import { StudentDomainEntity } from '@contexts/student-inscription/domain/entities';
import { IStudentDomainService } from '@contexts/student-inscription/domain/services';
import { GotStudentInfoEventPublisher } from '@contexts/student-inscription/domain/events/publishers';
import { AggregateRootException } from '@sofka/exceptions';
import { GetStudentHelper } from '.';

describe('GetStudentHelper function', () => {
  let studentId: string;
  let serviceMock: IStudentDomainService;
  let eventMock: GotStudentInfoEventPublisher;
  const student = {
    studentId: 'student_123',
  } as unknown as StudentDomainEntity;

  beforeEach(() => {
    studentId = 'student_123';
    serviceMock = {
      getStudent: jest.fn().mockResolvedValue(student),
    } as unknown as IStudentDomainService;
    eventMock = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as GotStudentInfoEventPublisher;
  });

  test('should throw an error if IStudentDomainService is not received', async () => {
    // Arrange
    const service = undefined;
    const event = undefined;
    const expectedMessage =
      'Servicio del tipo IStudentDomainService no recibido';
    // Act
    const result = () => GetStudentHelper(studentId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should throw an error if GotStudentInfoEventPublisher is not received', async () => {
    // Arrange
    const service = serviceMock;
    const event = undefined;
    const expectedMessage =
      'Evento del tipo GotStudentInfoEventPublisher no recibido';
    // Act
    const result = () => GetStudentHelper(studentId, service, event);
    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expectedMessage);
  });

  test('should return a StudentDomainEntity object and publish the event', async () => {
    // Arrange
    const expected = student;
    const service = serviceMock;
    const event = eventMock;
    // Act
    const result = await GetStudentHelper(studentId, service, event);
    // Assert
    expect(result).toEqual(expected);
    expect(event.publish).toHaveBeenCalled();
  });
});
