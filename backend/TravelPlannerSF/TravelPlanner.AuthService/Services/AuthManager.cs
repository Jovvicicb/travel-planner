using TravelPlanner.AuthService.Entities;
using TravelPlanner.AuthService.Repositories;
using TravelPlanner.AuthService.Validation;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
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

        public async Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request)
        {
            var validation = AuthValidator.ValidateRegister(request);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AuthResponseDto>.Fail(validation.Message);
            }

            var normalizedEmail = request.Email.Trim().ToLower();

            var emailExists = await userRepository.EmailExistsAsync(normalizedEmail);

            if (emailExists)
            {
                return ServiceResultDto<AuthResponseDto>.Fail("Email is already registered.", 409);
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

            var response = new AuthResponseDto
            {
                Token = token,
                User = MapToCurrentUser(createdUser)
            };

            return ServiceResultDto<AuthResponseDto>.Created(response, "Registration successful.");
        }

        public async Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request)
        {
            var validation = AuthValidator.ValidateLogin(request);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AuthResponseDto>.Fail(validation.Message);
            }

            var normalizedEmail = request.Email.Trim().ToLower();

            var user = await userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null)
            {
                return ServiceResultDto<AuthResponseDto>.Fail("Invalid email or password.", 401);
            }

            var passwordValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

            if (!passwordValid)
            {
                return ServiceResultDto<AuthResponseDto>.Fail("Invalid email or password.", 401);
            }

            var token = jwtTokenGenerator.GenerateToken(user);

            var response = new AuthResponseDto
            {
                Token = token,
                User = MapToCurrentUser(user)
            };

            return ServiceResultDto<AuthResponseDto>.Ok(response, "Login successful.");
        }

        public async Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId)
        {
            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return ServiceResultDto<CurrentUserDto>.Fail("User not found.", 404);
            }

            return ServiceResultDto<CurrentUserDto>.Ok(
                MapToCurrentUser(user),
                "Current user fetched successfully."
            );
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