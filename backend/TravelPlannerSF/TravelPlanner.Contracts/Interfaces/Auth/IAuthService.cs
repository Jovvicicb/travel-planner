using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.Interfaces.Auth
{
    // Service Fabric Remoting contract for authentication and admin user operations.
    public interface IAuthService : IService
    {
        // Authentication
        Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);

        Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);

        Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId);


        // Admin user management
        Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync();

        Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId);

        Task<ServiceResultDto<AdminUserResponseDto>> UpdateUserRoleAsync(int userId, UserRole role);

        Task<ServiceResultDto> DeleteUserAsync(int userId);
    }
}