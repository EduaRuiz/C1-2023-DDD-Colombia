import { InstitutionalMailValueObject } from '.';
jest.mock('@validations');

describe('InstitutionalMailValueObject', () => {
  const mockIsEmpty = jest.requireMock('@validations').IsEmpty;
  const mockIsMailStructure = jest.requireMock('@validations').IsMailStructure;
  const mockIsInstitutionalMail =
    jest.requireMock('@validations').IsInstitutionalMail;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if institutionalMail is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'institutionalMail';
      const expectedMessage = 'InstitutionalMail no puede ser vacío';
      // Act
      mockIsEmpty.mockReturnValue(true);
      const institutionalMail = new InstitutionalMailValueObject(value);
      institutionalMail.validateData();
      // Assert
      expect(institutionalMail.hasErrors()).toBe(expected);
      expect(institutionalMail.getErrors()[0]?.field).toBe(expectedField);
      expect(institutionalMail.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if institutionalMail is not a valid email structure', () => {
      // Arrange
      const value = 'invalid email';
      const expected = true;
      const expectedField = 'institutionalMail';
      const expectedMessage =
        'El valor de InstitutionalMail no cumple con la estructura de un mail válido';
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockIsMailStructure.mockReturnValue(false);
      const institutionalMail = new InstitutionalMailValueObject(value);
      institutionalMail.validateData();
      // Assert
      expect(institutionalMail.hasErrors()).toBe(expected);
      expect(institutionalMail.getErrors()[0]?.field).toBe(expectedField);
      expect(institutionalMail.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if institutionalMail is not an institutional email', () => {
      // Arrange
      const value = 'example@gmail.com';
      const expected = true;
      const expectedField = 'institutionalMail';
      const expectedMessage =
        'El valor de InstitutionalMail no es del dominio de sofka.edu.co';
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockIsMailStructure.mockReturnValue(true);
      mockIsInstitutionalMail.mockReturnValue(false);
      const institutionalMail = new InstitutionalMailValueObject(value);
      institutionalMail.validateData();
      // Assert
      expect(institutionalMail.hasErrors()).toBe(expected);
      expect(institutionalMail.getErrors()[0]?.field).toBe(expectedField);
      expect(institutionalMail.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if institutionalMail is valid', () => {
      // Arrange
      const value = 'example@sofka.com';
      const expected = false;
      // Act
      mockIsEmpty.mockReturnValue(false);
      mockIsMailStructure.mockReturnValue(true);
      mockIsInstitutionalMail.mockReturnValue(true);
      const institutionalMail = new InstitutionalMailValueObject(value);
      institutionalMail.validateData();
      // Assert
      expect(institutionalMail.hasErrors()).toBe(expected);
    });
  });
});
