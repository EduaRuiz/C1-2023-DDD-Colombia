import { SemesterIdValueObject } from '.';
jest.mock('@validations');

describe('SemesterIdValueObject', () => {
  const mockCheckIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if semesterId is not a valid UUID v4', () => {
      // Arrange
      const value = 'invalid-uuid';
      const expected = true;
      const expectedField = 'semesterId';
      const expectedMessage =
        'El valor de SemesterId no tine un formato de UUID válido';
      // Act
      mockCheckIsUUID4.mockReturnValue(false);
      const semesterId = new SemesterIdValueObject(value);
      semesterId.validateData();
      // Assert
      expect(semesterId.hasErrors()).toBe(expected);
      expect(semesterId.getErrors()[0]?.field).toBe(expectedField);
      expect(semesterId.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if semesterId is a valid UUID v4', () => {
      // Arrange
      const value = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
      const expected = false;
      // Act
      mockCheckIsUUID4.mockReturnValue(true);
      const semesterId = new SemesterIdValueObject(value);
      semesterId.validateData();
      // Assert
      expect(semesterId.hasErrors()).toBe(expected);
    });
  });
});
