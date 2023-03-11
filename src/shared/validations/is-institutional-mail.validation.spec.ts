import { IsInstitutionalMail } from '.';

describe('IsInstitutionalMail', () => {
  describe('when the email is institutional', () => {
    it('should return true if the email domain matches the given domain', () => {
      // Arrange
      const email = 'test-true-1@sofka.edu.co';
      const domain = 'sofka.edu.co';
      const expected = true;
      // Act
      const result = IsInstitutionalMail(email, domain);
      // Assert
      expect(result).toBe(expected);
    });

    it('should return false if the email domain does not match the given domain', () => {
      // Arrange
      const email = 'test-false-1@gmail.com';
      const domain = 'sofka.edu.co';
      const expected = false;
      // Act
      const result = IsInstitutionalMail(email, domain);
      // Assert
      expect(result).toBe(expected);
    });

    it('should return false if the email domain is a substring of the given domain', () => {
      // Arrange
      const email = 'test-false-2@sofka.edu.co.mx';
      const domain = 'sofka.edu.co';
      const expected = false;
      // Act
      const result = IsInstitutionalMail(email, domain);
      // Assert
      expect(result).toBe(expected);
    });

    it('should return false if the email domain is not at the end of the email address', () => {
      // Arrange
      const email = 'test-false-3@subdomain.sofka.edu.co';
      const domain = 'sofka.edu.co';
      const expected = false;
      // Act
      const result = IsInstitutionalMail(email, domain);
      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('when the email is not institutional', () => {
    it('should return false for a personal email', () => {
      // Arrange
      const email = 'sofka.edu.co@gmail.com';
      const domain = 'sofka.edu.co';
      const expected = false;
      // Act
      const result = IsInstitutionalMail(email, domain);
      // Assert
      expect(result).toBe(expected);
    });
  });
});
