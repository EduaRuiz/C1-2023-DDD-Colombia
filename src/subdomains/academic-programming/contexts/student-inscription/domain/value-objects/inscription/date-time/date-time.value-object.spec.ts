import { DateTimeValueObject } from '.';
jest.mock('@validations');

describe('DateTimeValueObject', () => {
  const mockCurrentDateTime = jest.requireMock('@validations').CurrentDateTime;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if date is more than 1 second away from current date', () => {
      // Arrange
      const now = new Date();
      const value = new Date(now.setSeconds(now.getSeconds() - 2));
      const expected = true;
      const expectedField = 'dateTime';
      const expectedMessage =
        'El valor de DateTime difiere por mas de un segundo a la fecha actual';
      // Act
      mockCurrentDateTime.mockReturnValue(false);
      const date = new DateTimeValueObject(value);
      date.validateData();
      // Assert
      expect(date.hasErrors()).toBe(expected);
      expect(date.getErrors()[0]?.field).toBe(expectedField);
      expect(date.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if date is less than or equal to 1 second away from current date', () => {
      // Arrange
      const now = new Date();
      const value = new Date(now.setSeconds(now.getSeconds() - 1));
      const expected = false;
      // Act
      mockCurrentDateTime.mockReturnValue(true);
      const date = new DateTimeValueObject(value);
      date.validateData();
      // Assert
      expect(date.hasErrors()).toBe(expected);
    });

    it('should not set error if date is less than or equal to 1 second away from current date', () => {
      // Arrange
      const expected = false;
      // Act
      mockCurrentDateTime.mockReturnValue(true);
      const date = new DateTimeValueObject();
      date.validateData();
      // Assert
      expect(date.hasErrors()).toBe(expected);
    });
  });
});
