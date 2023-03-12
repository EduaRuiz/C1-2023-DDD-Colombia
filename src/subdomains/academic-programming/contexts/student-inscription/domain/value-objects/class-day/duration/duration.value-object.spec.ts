import { DurationValueObject } from '.';
jest.mock('@validations');

describe('DurationValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockCheckNumberRange = jest.requireMock('@validations').NumberRange;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should set error if duration is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'duration';
      const expectedMessage = 'Duration no puede ser vacío';
      // // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const duration = new DurationValueObject(value);
      duration.validateData();
      // Assert
      expect(duration.hasErrors()).toBe(expected);
      expect(duration.getErrors()[0]?.field).toBe(expectedField);
      expect(duration.getErrors()[0]?.message).toBe(expectedMessage);
    });
    jest.clearAllMocks();
    test('should set error if duration is less than 1 hour', () => {
      // Arrange
      const value = 30;
      const expected = true;
      const expectedField = 'duration';
      const expectedMessage =
        'El valor de Duration no se encuentra dentro del rango min: 1 hora y max: 2 horas';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(false);
      const duration = new DurationValueObject(value);
      duration.validateData();
      // Assert
      expect(duration.hasErrors()).toBe(expected);
      expect(duration.getErrors()[0]?.field).toBe(expectedField);
      expect(duration.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should set error if duration is greater than 2 hours', () => {
      // Arrange
      const value = 180;
      const expected = true;
      const expectedField = 'duration';
      const expectedMessage =
        'El valor de Duration no se encuentra dentro del rango min: 1 hora y max: 2 horas';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(false);
      const duration = new DurationValueObject(value);
      duration.validateData();
      // Assert
      expect(duration.hasErrors()).toBe(expected);
      expect(duration.getErrors()[0]?.field).toBe(expectedField);
      expect(duration.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if duration is between 1 and 2 hours', () => {
      // Arrange
      const value = 90;
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(true);
      const duration = new DurationValueObject(value);
      duration.validateData();
      // Assert
      expect(duration.hasErrors()).toBe(expected);
    });
  });
});
