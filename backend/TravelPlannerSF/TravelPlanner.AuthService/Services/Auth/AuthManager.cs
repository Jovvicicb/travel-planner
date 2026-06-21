using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.AuthService.Entities;
using TravelPlanner.AuthService.Mapping.Auth;
using TravelPlanner.AuthService.Repositories;
using TravelPlanner.AuthService.Services.Tokens;
using TravelPlanner.AuthService.Validation.Auth;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.Contracts.Interfaces.Trips;

namespace TravelPlanner.AuthService.Services.Auth
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

        // Authentication
        public async Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request)
        {
            var validation = AuthValidator.ValidateRegister(request);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AuthResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
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
            var response = AuthMapper.ToAuthResponse(createdUser, token);

            return ServiceResultDto<AuthResponseDto>.Created(response, "Registration successful.");
        }

        public async Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request)
        {
            var validation = AuthValidator.ValidateLogin(request);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AuthResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
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
            var response = AuthMapper.ToAuthResponse(user, token);

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
                AuthMapper.ToCurrentUser(user),
                "Current user fetched successfully."
            );
        }


        // Admin user management
        public async Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync()
        {
            var users = await userRepository.GetAllAsync();

            var response = users
                .Select(AuthMapper.ToAdminUserResponse)
                .ToList();

            return ServiceResultDto<List<AdminUserResponseDto>>.Ok(
                response,
                "Users fetched successfully."
            );
        }

        public async Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId)
        {
            var validation = AuthValidator.ValidateUserId(userId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AdminUserResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return ServiceResultDto<AdminUserResponseDto>.Fail("User not found.", 404);
            }

            return ServiceResultDto<AdminUserResponseDto>.Ok(
                AuthMapper.ToAdminUserResponse(user),
                "User fetched successfully."
            );
        }

        public async Task<ServiceResultDto<AdminUserResponseDto>> UpdateUserRoleAsync(int userId, UserRole role)
        {
            var validation = AuthValidator.ValidateUpdateRole(userId, role);

            if (!validation.IsValid)
            {
                return ServiceResultDto<AdminUserResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return ServiceResultDto<AdminUserResponseDto>.Fail("User not found.", 404);
            }

            user.Role = role;

            await userRepository.UpdateAsync(user);

            return ServiceResultDto<AdminUserResponseDto>.Ok(
                AuthMapper.ToAdminUserResponse(user),
                "User role updated successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteUserAsync(int userId)
        {
            var validation = AuthValidator.ValidateUserId(userId);

            if (!validation.IsValid)
            {
                return ServiceResultDto.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var user = await userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return ServiceResultDto.Fail("User not found.", 404);
            }

            // User-owned travel plans are deleted through TripService to keep service databases separated.
            var tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );

            var deletePlansResult = await tripService.DeleteTravelPlansByOwnerAsync(userId);

            if (!deletePlansResult.Success)
            {
                return ServiceResultDto.Fail(
                    deletePlansResult.Message,
                    deletePlansResult.StatusCode
                );
            }

            await userRepository.DeleteAsync(user);

            return ServiceResultDto.Ok("User deleted successfully.");
        }
    }
}