import { ProfessorNameValueObject } from '.';
jest.mock('@validations');

describe('ProfessorNameValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockCheckStringRangeLength =
    jest.requireMock('@validations').StringRangeLength;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if professorName is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'professorName';
      const expectedMessage = 'ProfessorName no puede ser vacío';
      // // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const professorName = new ProfessorNameValueObject(value);
      professorName.validateData();
      // Assert
      expect(professorName.hasErrors()).toBe(expected);
      expect(professorName.getErrors()[0]?.field).toBe(expectedField);
      expect(professorName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if professorName length is less than 5', () => {
      // Arrange
      const value = 'abcd';
      const expected = true;
      const expectedField = 'professorName';
      const expectedMessage =
        'La longitud de ProfessorName no se encuentra dentro del rango min: 5 y max: 255';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(false);
      const professorName = new ProfessorNameValueObject(value);
      professorName.validateData();
      // Assert
      expect(professorName.hasErrors()).toBe(expected);
      expect(professorName.getErrors()[0]?.field).toBe(expectedField);
      expect(professorName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if professorName length is greater than 50', () => {
      // Arrange
      const value = 'a'.repeat(51);
      const expected = true;
      const expectedField = 'professorName';
      const expectedMessage =
        'La longitud de ProfessorName no se encuentra dentro del rango min: 5 y max: 255';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(false);
      const professorName = new ProfessorNameValueObject(value);
      professorName.validateData();
      // Assert
      expect(professorName.hasErrors()).toBe(expected);
      expect(professorName.getErrors()[0]?.field).toBe(expectedField);
      expect(professorName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if professorName length is between 5 and 50', () => {
      // Arrange
      const value = 'a'.repeat(30);
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckStringRangeLength.mockReturnValue(true);
      const professorName = new ProfessorNameValueObject(value);
      professorName.validateData();
      // Assert
      expect(professorName.hasErrors()).toBe(expected);
    });
  });
});
