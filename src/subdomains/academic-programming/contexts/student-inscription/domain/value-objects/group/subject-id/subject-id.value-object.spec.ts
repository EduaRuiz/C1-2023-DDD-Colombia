import { SubjectIdValueObject } from '.';
jest.mock('@validations');

describe('SubjectIdValueObject', () => {
  const mockIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if subject id is not a valid uuid v4', () => {
      // Arrange
      const value = 'invalid_uuid_v4';
      const expected = true;
      const expectedField = 'SubjectId';
      const expectedMessage =
        'El valor de SubjectId no tine un formato de UUID válido';
      // Act
      mockIsUUID4.mockReturnValue(false);
      const subjectId = new SubjectIdValueObject(value);
      subjectId.validateData();
      // Assert
      expect(subjectId.hasErrors()).toBe(expected);
      expect(subjectId.getErrors()[0]?.field).toBe(expectedField);
      expect(subjectId.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if subject id is a valid uuid v4', () => {
      // Arrange
      const value = '48f9a778-2aaf-424e-a4e7-56c8b1d2cc39';
      const expected = false;
      // Act
      mockIsUUID4.mockReturnValue(true);
      const subjectId = new SubjectIdValueObject(value);
      subjectId.validateData();
      // Assert
      expect(subjectId.hasErrors()).toBe(expected);
    });
  });
});
