import { StartTimeValueObject } from '.';
jest.mock('@validations');

describe('StartTimeValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockCheckNumberRange = jest.requireMock('@validations').NumberRange;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should set error if startTime is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'startTime';
      const expectedMessage = 'StartTime no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const startTime = new StartTimeValueObject(value);
      startTime.validateData();
      console.log(startTime.getErrors());
      // Assert
      expect(startTime.hasErrors()).toBe(expected);
      expect(startTime.getErrors()[0]?.field).toBe(expectedField);
      expect(startTime.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should set error if startTime is not an integer', () => {
      // Arrange
      const value = 8.5;
      const expected = true;
      const expectedField = 'startTime';
      const expectedMessage = 'Solo se admiten números enteros';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(true);
      const startTime = new StartTimeValueObject(value);
      startTime.validateData();
      // Assert
      expect(startTime.hasErrors()).toBe(expected);
      expect(startTime.getErrors()[0]?.field).toBe(expectedField);
      expect(startTime.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should set error if startTime is not between 7:00 am and 8:00 pm, or equals to 1:00 pm', () => {
      // Arrange
      const value1 = 6;
      const value2 = 21;
      const value3 = 13;
      const expected = true;
      const expectedField = 'startTime';
      const expectedMessage =
        'La longitud de StartTime no se encuentra dentro del rango 7:00 am y 8:00 pm; y no puede ser la 1:00 pm';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(false);
      const startTime1 = new StartTimeValueObject(value1);
      const startTime2 = new StartTimeValueObject(value2);
      const startTime3 = new StartTimeValueObject(value3);
      startTime1.validateData();
      startTime2.validateData();
      startTime3.validateData();
      // Assert
      expect(startTime1.hasErrors()).toBe(expected);
      expect(startTime1.getErrors()[0]?.field).toBe(expectedField);
      expect(startTime1.getErrors()[0]?.message).toBe(expectedMessage);

      expect(startTime2.hasErrors()).toBe(expected);
      expect(startTime2.getErrors()[0]?.field).toBe(expectedField);
      expect(startTime2.getErrors()[0]?.message).toBe(expectedMessage);

      expect(startTime3.hasErrors()).toBe(expected);
      expect(startTime3.getErrors()[0]?.field).toBe(expectedField);
      expect(startTime3.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if startTime is between 7:00 am and 8:00 pm, and not equals to 1:00 pm', () => {
      // Arrange
      const value1 = 7;
      const value2 = 14;
      const value3 = 9;
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(true);
      const startTime1 = new StartTimeValueObject(value1);
      const startTime2 = new StartTimeValueObject(value2);
      const startTime3 = new StartTimeValueObject(value3);
      startTime1.validateData();
      startTime2.validateData();
      startTime3.validateData();
      // Assert
      expect(startTime1.hasErrors()).toBe(expected);
      expect(startTime2.hasErrors()).toBe(expected);
      expect(startTime3.hasErrors()).toBe(expected);
    });
  });
});
