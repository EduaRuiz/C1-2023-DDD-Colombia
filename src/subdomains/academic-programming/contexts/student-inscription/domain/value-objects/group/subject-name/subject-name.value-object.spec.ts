import { SubjectNameValueObject } from '.';
jest.mock('@validations');

describe('SubjectNameValueObject', () => {
  const mockIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockStringRangeLength =
    jest.requireMock('@validations').StringRangeLength;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if subject name is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'subjectName';
      const expectedMessage = 'SsubjectName no puede ser vacío';
      // Act
      mockIsEmpty.mockReturnValue(true);
      const subjectName = new SubjectNameValueObject(value);
      subjectName.validateData();
      // Assert
      expect(subjectName.hasErrors()).toBe(expected);
      expect(subjectName.getErrors()[0]?.field).toBe(expectedField);
      expect(subjectName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if subject name length is less than 3', () => {
      // Arrange
      const value = 'a';
      const expected = true;
      const expectedField = 'subjectName';
      const expectedMessage =
        'La longitud de SubjectName no se encuentra dentro del rango min: 3 y max: 255';
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockStringRangeLength.mockReturnValue(false);
      const subjectName = new SubjectNameValueObject(value);
      subjectName.validateData();

      // Assert
      expect(subjectName.hasErrors()).toBe(expected);
      expect(subjectName.getErrors()[0]?.field).toBe(expectedField);
      expect(subjectName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if subject name length is greater than 255', () => {
      // Arrange
      const value = 'a'.repeat(300);
      const expected = true;
      const expectedField = 'subjectName';
      const expectedMessage =
        'La longitud de SubjectName no se encuentra dentro del rango min: 3 y max: 255';
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockStringRangeLength.mockReturnValue(false);
      const subjectName = new SubjectNameValueObject(value);
      subjectName.validateData();

      // Assert
      expect(subjectName.hasErrors()).toBe(expected);
      expect(subjectName.getErrors()[0]?.field).toBe(expectedField);
      expect(subjectName.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if subject name length is between 3 and 255', () => {
      // Arrange
      const value = 'a'.repeat(100);
      const expected = false;
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockStringRangeLength.mockReturnValue(true);
      const subjectName = new SubjectNameValueObject(value);
      subjectName.validateData();
      // Assert
      expect(subjectName.hasErrors()).toBe(expected);
    });
  });
});
