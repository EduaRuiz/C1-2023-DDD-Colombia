import { WeekDayValueObject } from '.';
jest.mock('@validations');

describe('WeekDayValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should set error if weekDay is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'weekDay';
      const expectedMessage = 'WeekDay no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const weekDay = new WeekDayValueObject(value);
      weekDay.validateData();
      // Assert
      expect(weekDay.hasErrors()).toBe(expected);
      expect(weekDay.getErrors()[0]?.field).toBe(expectedField);
      expect(weekDay.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should set error if weekDay is longer than 6 characters', () => {
      // Arrange
      const value = 'Martes 123';
      const expected = true;
      const expectedField = 'weekDay';
      const expectedMessage =
        'El valor de WeekDay no comprende domingos o días distintos a [L, M, MC, J, V, S]';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const weekDay = new WeekDayValueObject(value);
      weekDay.validateData();
      // Assert
      expect(weekDay.hasErrors()).toBe(expected);
      expect(weekDay.getErrors()[0]?.field).toBe(expectedField);
      expect(weekDay.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if weekDay has a valid length', () => {
      // Arrange
      const value = 'L';
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const weekDay = new WeekDayValueObject(value);
      weekDay.validateData();
      // Assert
      expect(weekDay.hasErrors()).toBe(expected);
    });
  });
});
