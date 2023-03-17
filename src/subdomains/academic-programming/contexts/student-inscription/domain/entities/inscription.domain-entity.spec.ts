import {
  GroupDomainEntity,
  InscriptionDomainEntity,
  SemesterDomainEntity,
  StudentDomainEntity,
} from '.';

describe('InscriptionDomainEntity', () => {
  describe('constructor', () => {
    it('should create an InscriptionDomainEntity object with the given parameters', () => {
      // Arrange
      const student = {} as unknown as StudentDomainEntity;
      const semester = {} as unknown as SemesterDomainEntity;
      const groups = [] as unknown as GroupDomainEntity[];
      const inscriptionState = 'active';
      const dateTime = new Date('2022-01-01');
      const inscriptionId = '789';
      // Act
      const inscription = new InscriptionDomainEntity(
        student,
        semester,
        groups,
        inscriptionState,
        dateTime,
        inscriptionId,
      );
      // Assert
      expect(inscription.student).toBe(student);
      expect(inscription.semester).toBe(semester);
      expect(inscription.groups).toBe(groups);
      expect(inscription.inscriptionState).toBe(inscriptionState);
      expect(inscription.dateTime).toBe(dateTime);
      expect(inscription.inscriptionId).toBe(inscriptionId);
    });

    it('should create an InscriptionDomainEntity object without dateTime and inscriptionId', () => {
      // Arrange
      const student = {} as unknown as StudentDomainEntity;
      const semester = {} as unknown as SemesterDomainEntity;
      const groups = [] as unknown as GroupDomainEntity[];
      const inscriptionState = 'active';
      // Act
      const inscription = new InscriptionDomainEntity(
        student,
        semester,
        groups,
        inscriptionState,
      );
      // Assert
      expect(inscription.student).toBe(student);
      expect(inscription.semester).toBe(semester);
      expect(inscription.groups).toBe(groups);
      expect(inscription.inscriptionState).toBe(inscriptionState);
      expect(inscription.dateTime).toBeUndefined();
      expect(inscription.inscriptionId).toBeUndefined();
    });
  });
});
