import { InscriptionDomainEntity, SemesterDomainEntity } from '.';

describe('SemesterDomainEntity', () => {
  describe('Constructor', () => {
    const semesterId = 'SEM01';
    const year = new Date();
    const part = 2;
    const inscription = [] as unknown as InscriptionDomainEntity[];

    it('should create an instance of SemesterDomainEntity with all properties', () => {
      // Arrange
      const expectedSemesterId = semesterId;
      const expectedYear = year;
      const expectedPart = part;
      const expectedInscription = inscription;
      // Act
      const semester = new SemesterDomainEntity(
        semesterId,
        year,
        part,
        inscription,
      );
      // Assert
      expect(semester.semesterId).toEqual(expectedSemesterId);
      expect(semester.year).toEqual(expectedYear);
      expect(semester.part).toEqual(expectedPart);
      expect(semester.inscription).toEqual(expectedInscription);
    });

    it('should create an instance of SemesterDomainEntity with only required properties', () => {
      // Arrange
      const expectedSemesterId = semesterId;
      const expectedYear = year;
      const expectedPart = part;
      // Act
      const semester = new SemesterDomainEntity(semesterId, year, part);
      // Assert
      expect(semester.semesterId).toEqual(expectedSemesterId);
      expect(semester.year).toEqual(expectedYear);
      expect(semester.part).toEqual(expectedPart);
      expect(semester.inscription).toBeUndefined();
    });
  });
});
