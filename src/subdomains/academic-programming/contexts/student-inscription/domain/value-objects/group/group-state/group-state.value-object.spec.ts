import { GroupStateValueObject } from '.';
jest.mock('@validations');

describe('GroupStateValueObject', () => {
  const mockCheckIsEmpty = jest.requireMock('@validations').IsEmpty;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if GroupState is empty', () => {
      // Arrange
      const value = undefined;
      const expected = true;
      const expectedField = 'groupState';
      const expectedMessage = 'GroupState no puede ser vacío';
      // Act
      mockCheckIsEmpty.mockReturnValue(true);
      const groupState = new GroupStateValueObject(value);
      groupState.validateData();
      // Assert
      expect(groupState.hasErrors()).toBe(expected);
      expect(groupState.getErrors()[0]?.field).toBe(expectedField);
      expect(groupState.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should set error if GroupState is not a valid state', () => {
      // Arrange
      const value = 'invalid';
      const expected = true;
      const expectedField = 'groupState';
      const expectedMessage =
        'El valor de GroupState no corresponde a un estado válido';
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const groupState = new GroupStateValueObject(value);
      groupState.validateData();
      // Assert
      expect(groupState.hasErrors()).toBe(expected);
      expect(groupState.getErrors()[0]?.field).toBe(expectedField);
      expect(groupState.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if GroupState is a valid state', () => {
      // Arrange
      const value = 'open';
      const expected = false;
      // Act
      mockCheckIsEmpty.mockReturnValue(false);
      const groupState = new GroupStateValueObject(value);
      groupState.validateData();
      // Assert
      expect(groupState.hasErrors()).toBe(expected);
    });
  });
});
