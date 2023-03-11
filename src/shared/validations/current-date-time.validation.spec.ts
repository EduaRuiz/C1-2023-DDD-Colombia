import { CurrentDateTime } from '.';

describe('CurrentDateTime', () => {
  describe(`when the difference between the two dates is 
  less than or equal to the tolerance`, () => {
    it('should return true', () => {
      // Arrange
      const value = new Date('2023-03-10T12:00:00.000Z');
      const now = new Date('2023-03-10T12:00:00.000Z');
      const tolerance = 1; //One second of tolerance
      const expected = true;

      // Act
      const result = CurrentDateTime(value, now, tolerance);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe(`when the difference between the two dates is
  greater than the tolerance`, () => {
    it('should return false', () => {
      // Arrange
      const value = new Date('2023-03-10T12:00:00.000Z');
      const now = new Date('2023-03-10T12:01:02.000Z');
      const tolerance = 60; //One minute of tolerance
      const expected = false;

      // Act
      const result = CurrentDateTime(value, now, tolerance);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
