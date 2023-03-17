import { FullNameValueObject } from '.';
jest.mock('@validations');

describe('FullNameValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockCheckStringRangeLength =
    jest.requireMock('@validations').StringRangeLength;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if fullName is empty', () => {
      // Arrange
      const value = '';
      const expected = true;
      const expectedField = 'fullName';
      const expectedMessage = 'FullName no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const fullName = new FullNameValueObject(value);
      fullName.validateData();
      // Assert
      expect(fullName.hasErrors()).toBe(expected);
      expect(fullName.getErrors()[0]?.field).toBe(expectedField);
      expect(fullName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if fullName is less than 10 characters', () => {
      // Arrange
      const value = 'John Doe';
      const expected = true;
      const expectedField = 'fullName';
      const expectedMessage =
        'La longitud de FullName no se encuentra dentro del rango min: 10 y max: 255';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(false);
      const fullName = new FullNameValueObject(value);
      fullName.validateData();
      // Assert
      expect(fullName.hasErrors()).toBe(expected);
      expect(fullName.getErrors()[0]?.field).toBe(expectedField);
      expect(fullName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if fullName is greater than 255 characters', () => {
      // Arrange
      const value = 'a'.repeat(256);
      const expected = true;
      const expectedField = 'fullName';
      const expectedMessage =
        'La longitud de FullName no se encuentra dentro del rango min: 10 y max: 255';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(false);
      const fullName = new FullNameValueObject(value);
      fullName.validateData();
      // Assert
      expect(fullName.hasErrors()).toBe(expected);
      expect(fullName.getErrors()[0]?.field).toBe(expectedField);
      expect(fullName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if fullName is between 10 and 255 characters', () => {
      // Arrange
      const value = 'John Doe Smith';
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(true);
      const fullName = new FullNameValueObject(value);
      fullName.validateData();
      // Assert
      expect(fullName.hasErrors()).toBe(expected);
    });
  });
});
