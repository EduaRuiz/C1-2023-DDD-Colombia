import { InscriptionStateValueObject } from '.';
jest.mock('@validations');

describe('InscriptionStateValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if inscriptionState is empty', () => {
      // Arrange
      const value = '';
      const expected = true;
      const expectedField = 'inscriptionState';
      const expectedMessage = 'InscriptionState no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const inscriptionState = new InscriptionStateValueObject(value);
      inscriptionState.validateData();
      // Assert
      expect(inscriptionState.hasErrors()).toBe(expected);
      expect(inscriptionState.getErrors()[0]?.field).toBe(expectedField);
      expect(inscriptionState.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if inscriptionState is not a valid state', () => {
      // Arrange
      const value = 'invalid';
      const expected = true;
      const expectedField = 'inscriptionState';
      const expectedMessage =
        'El valor de InscriptionState no corresponde a un estado válido [cancelled, completed, active]';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const inscriptionState = new InscriptionStateValueObject(value);
      inscriptionState.validateData();
      // Assert
      expect(inscriptionState.hasErrors()).toBe(expected);
      expect(inscriptionState.getErrors()[0]?.field).toBe(expectedField);
      expect(inscriptionState.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if inscriptionState is valid', () => {
      // Arrange
      const value = 'active';
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const inscriptionState = new InscriptionStateValueObject(value);
      inscriptionState.validateData();
      // Assert
      expect(inscriptionState.hasErrors()).toBe(expected);
    });
  });
});
