jest.mock('@validations');
import { InscriptionIdValueObject } from '.';

describe('InscriptionIdValueObject', () => {
  const mockCheckIsUUID4 = jest.requireMock('@validations').IsUUID4;
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());

  describe('constructor', () => {
    test('should create a new instance with the provided value', () => {
      // Arrange
      const value = 'd83405ee-7ce6-4f2f-aa75-11a8c7b9f9b2';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckIsUUID4.mockReturnValue(true);
      const inscriptionId = new InscriptionIdValueObject(value);
      // Assert
      expect(inscriptionId).toBeDefined();
      expect(inscriptionId.value).toBe(value);
    });

    test('should create a new instance with non provided value', () => {
      // Arrange
      const expected = false;
      // Act
      mockCheckIsUUID4.mockReturnValue(true);
      mockCheckIsEmpty.mockReturnValue(false);
      const inscriptionId = new InscriptionIdValueObject();
      // Assert
      expect(inscriptionId).toBeDefined();
      expect(inscriptionId.hasErrors()).toBe(expected);
    });

    test('should set error if value is null, "", etc', () => {
      // Arrange
      const value = '';
      const expected = true;
      const expectedField = 'inscriptionId';
      const expectedMessage = 'InscriptionId no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      mockCheckIsUUID4.mockReturnValue(true);
      const inscriptionId = new InscriptionIdValueObject(value);
      // Assert
      expect(inscriptionId.hasErrors()).toBe(expected);
      expect(inscriptionId.getErrors()[0]?.field).toBe(expectedField);
      expect(inscriptionId.getErrors()[0]?.message).toBe(expectedMessage);
    });
  });

  describe('validateData', () => {
    test('should set error if inscriptionId is not a valid uuid', () => {
      // Arrange
      const value = 'Id';
      const expected = true;
      const expectedField = 'inscriptionId';
      const expectedMessage =
        'El valor de InscriptionId no tine un formato de UUID válido';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      mockCheckIsUUID4.mockReturnValue(false);
      const inscriptionId = new InscriptionIdValueObject(value);
      inscriptionId.validateData();
      // Assert
      expect(inscriptionId.hasErrors()).toBe(expected);
      expect(inscriptionId.getErrors()[0]?.field).toBe(expectedField);
      expect(inscriptionId.getErrors()[0]?.message).toBe(expectedMessage);
    });

    test('should not set error if inscriptionId is a valid uuid', () => {
      // Arrange
      const value = 'd83405ee-7ce6-4f2f-aa75-11a8c7b9f9b2';
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      mockCheckIsUUID4.mockReturnValue(true);
      const inscriptionId = new InscriptionIdValueObject(value);
      inscriptionId.validateData();
      // Assert
      expect(inscriptionId.hasErrors()).toBe(expected);
    });
  });
});
