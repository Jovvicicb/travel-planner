using BCrypt.Net;
using TravelPlanner.AuthService.Entities;
using TravelPlanner.AuthService.Repositories;
using TravelPlanner.AuthService.Validation;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.AuthService.Services
{
    public class AuthManager : IAuthManager
    {
        private readonly IUserRepository userRepository;
        private readonly IJwtTokenGenerator jwtTokenGenerator;

        public AuthManager(
            IUserRepository userRepository,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            this.userRepository = userRepository;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
        {
            var validation = AuthValidator.ValidateRegister(request);

            if (!validation.IsValid)
            {
                return Fail(validation.Message);
            }

            var normalizedEmail = request.Email.Trim().ToLower();

            var emailExists = await userRepository.EmailExistsAsync(normalizedEmail);

            if (emailExists)
            {
                return Fail("Email is already registered.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                FullName = request.FullName.Trim(),
                Email = normalizedEmail,
                PasswordHash = passwordHash,
                Role = UserRole.User,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await userRepository.CreateAsync(user);

            var token = jwtTokenGenerator.GenerateToken(createdUser);

            return Success("Registration successful.", createdUser, token);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
        {
            var validation = AuthValidator.ValidateLogin(request);

            if (!validation.IsValid)
            {
                return Fail(validation.Message);
            }

            var normalizedEmail = request.Email.Trim().ToLower();

            var user = await userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null)
            {
                return Fail("Invalid email or password.");
            }

            var passwordValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

            if (!passwordValid)
            {
                return Fail("Invalid email or password.");
            }

            var token = jwtTokenGenerator.GenerateToken(user);

            return Success("Login successful.", user, token);
        }

        public async Task<CurrentUserDto?> GetCurrentUserAsync(int userId)
        {
            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            return MapToCurrentUser(user);
        }

        private static AuthResponseDto Success(string message, User user, string token)
        {
            return new AuthResponseDto
            {
                Success = true,
                Message = message,
                Token = token,
                User = MapToCurrentUser(user)
            };
        }

        private static AuthResponseDto Fail(string message)
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = message
            };
        }

        private static CurrentUserDto MapToCurrentUser(User user)
        {
            return new CurrentUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
        }
    }
}