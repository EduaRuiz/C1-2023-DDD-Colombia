import { InscriptionDomainEntity, StudentDomainEntity } from '.';

describe('StudentDomainEntity', () => {
  describe('Constructor', () => {
    const studentId = 'STU01';
    const fullName = 'John Doe';
    const institutionalMail = 'johndoe@university.edu';
    const inscription = [] as unknown as InscriptionDomainEntity[];

    it('should create an instance of StudentDomainEntity with all properties', () => {
      // Arrange
      const expectedStudentId = studentId;
      const expectedFullName = fullName;
      const expectedInstitutionalMail = institutionalMail;
      const expectedInscription = inscription;
      // Act
      const student = new StudentDomainEntity(
        studentId,
        fullName,
        institutionalMail,
        inscription,
      );
      // Assert
      expect(student.studentId).toEqual(expectedStudentId);
      expect(student.fullName).toEqual(expectedFullName);
      expect(student.institutionalMail).toEqual(expectedInstitutionalMail);
      expect(student.inscription).toEqual(expectedInscription);
    });

    it('should create an instance of StudentDomainEntity with required properties only', () => {
      // Arrange
      const expectedStudentId = studentId;
      const expectedFullName = fullName;
      const expectedInstitutionalMail = institutionalMail;
      // Act
      const student = new StudentDomainEntity(
        studentId,
        fullName,
        institutionalMail,
      );
      // Assert
      expect(student.studentId).toEqual(expectedStudentId);
      expect(student.fullName).toEqual(expectedFullName);
      expect(student.institutionalMail).toEqual(expectedInstitutionalMail);
      expect(student.inscription).toBeUndefined();
    });
  });
});
