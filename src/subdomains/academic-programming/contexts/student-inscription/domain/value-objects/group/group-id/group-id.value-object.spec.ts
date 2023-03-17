import { GroupIdValueObject } from '.';
jest.mock('@validations');

describe('GroupIdValueObject', () => {
  const mockCheckIsUUID4 = jest.requireMock('@validations').IsUUID4;
  beforeEach(() => jest.clearAllMocks());
  describe('validateData', () => {
    it('should set error if group id is not a valid UUID v4', () => {
      // Arrange
      const value = 'invalid-uuid';
      const expected = true;
      const expectedField = 'groupId';
      const expectedMessage =
        'El valor de GroupId no tine un formato de UUID válido';
      // Act
      mockCheckIsUUID4.mockReturnValue(false);
      const groupId = new GroupIdValueObject(value);
      groupId.validateData();
      // Assert
      expect(groupId.hasErrors()).toBe(expected);
      expect(groupId.getErrors()[0]?.field).toBe(expectedField);
      expect(groupId.getErrors()[0]?.message).toBe(expectedMessage);
    });

    it('should not set error if group id is a valid UUID v4', () => {
      // Arrange
      const value = '814c10b3-3b3c-44a8-96d1-74c0a343a8bf';
      const expected = false;
      // Act
      mockCheckIsUUID4.mockReturnValue(true);
      const groupId = new GroupIdValueObject(value);
      groupId.validateData();
      // Assert
      expect(groupId.hasErrors()).toBe(expected);
    });
  });
});
