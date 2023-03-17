import { YearValueObject } from '.';
jest.mock('@validations');

describe('YearValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if year is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'year';
      const expectedMessage = 'Year no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const year = new YearValueObject(value);
      year.validateData();
      // Assert
      expect(year.hasErrors()).toBe(expected);
      expect(year.getErrors()[0]?.field).toBe(expectedField);
      expect(year.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if year is not current year', () => {
      // Arrange
      const value = new Date('2022-01-01');
      const expected = true;
      const expectedField = 'year';
      const expectedMessage =
        'El valor de Year no puede ser diferente al año actual';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const year = new YearValueObject(value);
      year.validateData();
      // Assert
      expect(year.hasErrors()).toBe(expected);
      expect(year.getErrors()[0]?.field).toBe(expectedField);
      expect(year.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if year is current year', () => {
      // Arrange
      const value = new Date();
      const expected = true;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const year = new YearValueObject(value);
      year.validateData();
      // Assert
      expect(year.hasErrors()).toBe(expected);
    });
  });
});
