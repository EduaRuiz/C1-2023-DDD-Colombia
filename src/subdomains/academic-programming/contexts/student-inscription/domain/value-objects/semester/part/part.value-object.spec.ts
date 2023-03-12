import { PartValueObject } from '.';
jest.mock('@validations');

describe('PartValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should set error if part is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'part';
      const expectedMessage = 'Part no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const part = new PartValueObject(value);
      part.validateData();
      // Assert
      expect(part.hasErrors()).toBe(expected);
      expect(part.getErrors()[0]?.field).toBe(expectedField);
      expect(part.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should set error if part is not 1 or 2', () => {
      // Arrange
      const value = 3;
      const expected = true;
      const expectedField = 'part';
      const expectedMessage = 'El valor de Part no puede ser distinto de 1 o 2';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const part = new PartValueObject(value);
      part.validateData();
      // Assert
      expect(part.hasErrors()).toBe(expected);
      expect(part.getErrors()[0]?.field).toBe(expectedField);
      expect(part.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if part is 1 or 2', () => {
      // Arrange
      const value = 1;
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const part = new PartValueObject(value);
      part.validateData();
      // Assert
      expect(part.hasErrors()).toBe(expected);
    });
  });
});
