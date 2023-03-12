import { InscriptionIdValueObject } from '.';
jest.mock('@validations');

describe('InscriptionIdValueObject', () => {
  const mockCheckIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());

  describe('constructor', () => {
    test('should create a new instance with the provided value', () => {
      // Arrange
      const value = 'd83405ee-7ce6-4f2f-aa75-11a8c7b9f9b2';
      // Act
      mockCheckIsUUID4.mockReturnValue(true);
      const inscriptionId = new InscriptionIdValueObject(value);
      // Assert
      expect(inscriptionId).toBeDefined();
      expect(inscriptionId.value).toBe(value);
    });
  });

  describe('validateData', () => {
    test('should set error if inscriptionId is not a valid uuid', () => {
      // Arrange
      const value = 'invalid-uuid';
      const expected = true;
      const expectedField = 'inscriptionId';
      const expectedMessage =
        'El valor de InscriptionId no tine un formato de UUID válido';
      // Act
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
      mockCheckIsUUID4.mockReturnValue(true);
      const inscriptionId = new InscriptionIdValueObject(value);
      inscriptionId.validateData();
      // Assert
      expect(inscriptionId.hasErrors()).toBe(expected);
    });
  });
});
