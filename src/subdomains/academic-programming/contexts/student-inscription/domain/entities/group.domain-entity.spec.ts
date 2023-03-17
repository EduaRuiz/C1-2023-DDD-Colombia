import { GroupDomainEntity, ClassDayDomainEntity } from '.';
import { InscriptionDomainEntity } from './inscription.domain-entity';

describe('GroupDomainEntity', () => {
  describe('constructor', () => {
    it('should create a GroupDomainEntity object with the given parameters', () => {
      // Arrange
      const groupId = '123';
      const classDays = [] as unknown as ClassDayDomainEntity[];
      const subjectName = 'Mathematics';
      const subjectId = 'MATH101';
      const professorName = 'John Doe';
      const quoteAvailable = 10;
      const groupState = 'open';
      const inscription = [] as unknown as InscriptionDomainEntity[];
      // Act
      const group = new GroupDomainEntity(
        groupId,
        classDays,
        subjectName,
        subjectId,
        professorName,
        quoteAvailable,
        groupState,
        inscription,
      );
      // Assert
      expect(group.groupId).toBe(groupId);
      expect(group.classDays).toBe(classDays);
      expect(group.subjectName).toBe(subjectName);
      expect(group.subjectId).toBe(subjectId);
      expect(group.professorName).toBe(professorName);
      expect(group.quoteAvailable).toBe(quoteAvailable);
      expect(group.groupState).toBe(groupState);
      expect(group.inscription).toBe(inscription);
    });

    it('should create a GroupDomainEntity object without inscription', () => {
      // Arrange
      const groupId = '123';
      const classDays = [] as unknown as ClassDayDomainEntity[];
      const subjectName = 'Mathematics';
      const subjectId = 'MATH101';
      const professorName = 'John Doe';
      const quoteAvailable = 10;
      const groupState = 'open';
      // Act
      const group = new GroupDomainEntity(
        groupId,
        classDays,
        subjectName,
        subjectId,
        professorName,
        quoteAvailable,
        groupState,
      );
      // Assert
      expect(group.groupId).toBe(groupId);
      expect(group.classDays).toBe(classDays);
      expect(group.subjectName).toBe(subjectName);
      expect(group.subjectId).toBe(subjectId);
      expect(group.professorName).toBe(professorName);
      expect(group.quoteAvailable).toBe(quoteAvailable);
      expect(group.groupState).toBe(groupState);
      expect(group.inscription).toBeUndefined();
    });
  });
});
