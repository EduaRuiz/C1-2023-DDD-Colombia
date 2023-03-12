import { StudentIdValueObject } from '.';
jest.mock('@validations');

describe('StudentIdValueObject', () => {
  const mockIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should set error if value is not a UUID v4', () => {
      // Arrange
      const value = 'invalid-id';
      const expected = true;
      const expectedField = 'studentId';
      const expectedMessage =
        'El valor de StudentId no tine un formato de UUID válido';
      // Act
      mockIsUUID4.mockReturnValue(false);
      const studentId = new StudentIdValueObject(value);
      studentId.validateData();
      // Assert
      expect(studentId.hasErrors()).toBe(expected);
      expect(studentId.getErrors()[0]?.field).toBe(expectedField);
      expect(studentId.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if value is a UUID v4', () => {
      // Arrange
      const value = 'c4a760a8-dbcf-4e14-aaa6-dc4e0b4393e2';
      const expected = false;
      // Act
      mockIsUUID4.mockReturnValue(true);
      const studentId = new StudentIdValueObject(value);
      studentId.validateData();
      // Assert
      expect(studentId.hasErrors()).toBe(expected);
    });
  });
});
