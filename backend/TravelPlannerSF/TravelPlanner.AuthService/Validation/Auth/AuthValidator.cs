using System.Text.RegularExpressions;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.AuthService.Validation.Auth
{
    public static class AuthValidator
    {
        public static ValidationResultDto ValidateRegister(RegisterRequestDto request)
        {
            if (request == null)
            {
                return ValidationResultDto.Fail("Request body is required.");
            }

            if (string.IsNullOrWhiteSpace(request.FullName))
            {
                return ValidationResultDto.Fail("Full name is required.");
            }

            if (request.FullName.Trim().Length < 2)
            {
                return ValidationResultDto.Fail("Full name must contain at least 2 characters.");
            }

            if (request.FullName.Trim().Length > 100)
            {
                return ValidationResultDto.Fail("Full name cannot be longer than 100 characters.");
            }

            var emailValidation = ValidateEmail(request.Email);

            if (!emailValidation.IsValid)
            {
                return emailValidation;
            }

            return ValidatePassword(request.Password);
        }

        public static ValidationResultDto ValidateLogin(LoginRequestDto request)
        {
            if (request == null)
            {
                return ValidationResultDto.Fail("Request body is required.");
            }

            var emailValidation = ValidateEmail(request.Email);

            if (!emailValidation.IsValid)
            {
                return emailValidation;
            }

            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return ValidationResultDto.Fail("Password is required.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUserId(int userId)
        {
            if (userId <= 0)
            {
                return ValidationResultDto.Fail("User id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUserIds(List<int> userIds)
        {
            if (userIds == null || userIds.Count == 0)
            {
                return ValidationResultDto.Fail("User ids are required.");
            }

            if (userIds.Any(id => id <= 0))
            {
                return ValidationResultDto.Fail("One or more user ids are not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUpdateRole(int userId, UserRole role)
        {
            var userIdValidation = ValidateUserId(userId);

            if (!userIdValidation.IsValid)
            {
                return userIdValidation;
            }

            if (!Enum.IsDefined(typeof(UserRole), role))
            {
                return ValidationResultDto.Fail("User role is not valid.");
            }

            return ValidationResultDto.Success();
        }

        private static ValidationResultDto ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return ValidationResultDto.Fail("Email is required.");
            }

            var normalizedEmail = email.Trim();

            if (normalizedEmail.Length > 150)
            {
                return ValidationResultDto.Fail("Email cannot be longer than 150 characters.");
            }

            var emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

            if (!Regex.IsMatch(normalizedEmail, emailRegex))
            {
                return ValidationResultDto.Fail("Email format is not valid.");
            }

            return ValidationResultDto.Success();
        }

        private static ValidationResultDto ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return ValidationResultDto.Fail("Password is required.");
            }

            if (password.Length < 8)
            {
                return ValidationResultDto.Fail("Password must contain at least 8 characters.");
            }

            if (!password.Any(char.IsUpper))
            {
                return ValidationResultDto.Fail("Password must contain at least one uppercase letter.");
            }

            if (!password.Any(char.IsLower))
            {
                return ValidationResultDto.Fail("Password must contain at least one lowercase letter.");
            }

            if (!password.Any(char.IsDigit))
            {
                return ValidationResultDto.Fail("Password must contain at least one number.");
            }

            return ValidationResultDto.Success();
        }
    }
}