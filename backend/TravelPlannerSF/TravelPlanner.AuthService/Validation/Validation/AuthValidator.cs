using System.Text.RegularExpressions;
using TravelPlanner.Contracts.DTOs.Auth;

namespace TravelPlanner.AuthService.Validation
{
    public static class AuthValidator
    {
        public static AuthValidationResult ValidateRegister(RegisterRequestDto request)
        {
            if (request == null)
            {
                return AuthValidationResult.Fail("Request body is required.");
            }

            if (string.IsNullOrWhiteSpace(request.FullName))
            {
                return AuthValidationResult.Fail("Full name is required.");
            }

            if (request.FullName.Trim().Length > 100)
            {
                return AuthValidationResult.Fail("Full name cannot be longer than 100 characters.");
            }

            var emailValidation = ValidateEmail(request.Email);

            if (!emailValidation.IsValid)
            {
                return emailValidation;
            }

            var passwordValidation = ValidatePassword(request.Password);

            if (!passwordValidation.IsValid)
            {
                return passwordValidation;
            }

            return AuthValidationResult.Success();
        }

        public static AuthValidationResult ValidateLogin(LoginRequestDto request)
        {
            if (request == null)
            {
                return AuthValidationResult.Fail("Request body is required.");
            }

            var emailValidation = ValidateEmail(request.Email);

            if (!emailValidation.IsValid)
            {
                return emailValidation;
            }

            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return AuthValidationResult.Fail("Password is required.");
            }

            return AuthValidationResult.Success();
        }

        private static AuthValidationResult ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return AuthValidationResult.Fail("Email is required.");
            }

            var normalizedEmail = email.Trim();

            if (normalizedEmail.Length > 150)
            {
                return AuthValidationResult.Fail("Email cannot be longer than 150 characters.");
            }

            var emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

            if (!Regex.IsMatch(normalizedEmail, emailRegex))
            {
                return AuthValidationResult.Fail("Email format is not valid.");
            }

            return AuthValidationResult.Success();
        }

        private static AuthValidationResult ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return AuthValidationResult.Fail("Password is required.");
            }

            if (password.Length < 8)
            {
                return AuthValidationResult.Fail("Password must contain at least 8 characters.");
            }

            if (!password.Any(char.IsUpper))
            {
                return AuthValidationResult.Fail("Password must contain at least one uppercase letter.");
            }

            if (!password.Any(char.IsDigit))
            {
                return AuthValidationResult.Fail("Password must contain at least one number.");
            }

            return AuthValidationResult.Success();
        }
    }
}