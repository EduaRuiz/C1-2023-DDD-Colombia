import { ClassDayIdValueObject } from '.';
jest.mock('@validations');

describe('ClassDayIdValueObject', () => {
  const mockCheckIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    test('should not set error if value is a valid UUID v4', () => {
      // Arrange
      const value = '56352ab1-2118-4112-9e82-70df36a7d0af';
      const expected = false;
      // Act
      mockCheckIsUUID4.mockReturnValue(true);
      const classDayId = new ClassDayIdValueObject(value);
      classDayId.validateData();

      // Assert
      expect(classDayId.hasErrors()).toBe(expected);
    });

    test('should set error if id is not a valid UUID', () => {
      // Arrange
      const value = 'not-a-uuid';
      const expected = true;
      const expectedField = 'classDayId';
      const expectedMessage =
        'El valor de ClassDayId no tiene un formato de UUID válido';
      // Act
      mockCheckIsUUID4.mockReturnValue(false);
      const classDayId = new ClassDayIdValueObject(value);
      classDayId.validateData();
      // Assert
      expect(classDayId.hasErrors()).toBe(expected);
      expect(classDayId.getErrors()[0]?.field).toBe(expectedField);
      expect(classDayId.getErrors()[0]?.message).toBe(expectedMessage);
    });
  });
});
