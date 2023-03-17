import { QuotaAvailableValueObject } from '.';
jest.mock('@validations');

describe('QuotaAvailableValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockCheckNumberRange = jest.requireMock('@validations').NumberRange;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if quotaAvailable is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'quotaAvailable';
      const expectedMessage = 'QuotaAvailable no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const quotaAvailable = new QuotaAvailableValueObject(value);
      quotaAvailable.validateData();
      // Assert
      expect(quotaAvailable.hasErrors()).toBe(expected);
      expect(quotaAvailable.getErrors()[0]?.field).toBe(expectedField);
      expect(quotaAvailable.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if quotaAvailable is less than 0', () => {
      // Arrange
      const value = -5;
      const expected = true;
      const expectedField = 'quotaAvailable';
      const expectedMessage =
        'El valor de QuotaAvailable no se encuentra dentro del rango min:0 y max 30';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(false);
      const quotaAvailable = new QuotaAvailableValueObject(value);
      quotaAvailable.validateData();
      // Assert
      expect(quotaAvailable.hasErrors()).toBe(expected);
      expect(quotaAvailable.getErrors()[0]?.field).toBe(expectedField);
      expect(quotaAvailable.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if quotaAvailable is greater than 30', () => {
      // Arrange
      const value = 31;
      const expected = true;
      const expectedField = 'quotaAvailable';
      const expectedMessage =
        'El valor de QuotaAvailable no se encuentra dentro del rango min:0 y max 30';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(false);
      const quotaAvailable = new QuotaAvailableValueObject(value);
      quotaAvailable.validateData();
      // Assert
      expect(quotaAvailable.hasErrors()).toBe(expected);
      expect(quotaAvailable.getErrors()[0]?.field).toBe(expectedField);
      expect(quotaAvailable.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if quotaAvailable is between 0 and 30', () => {
      // Arrange
      const value = 15;
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckNumberRange.mockReturnValue(true);
      const quotaAvailable = new QuotaAvailableValueObject(value);
      quotaAvailable.validateData();
      // Assert
      expect(quotaAvailable.hasErrors()).toBe(expected);
    });
  });
});
