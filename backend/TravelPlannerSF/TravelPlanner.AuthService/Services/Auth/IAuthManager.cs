using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.AuthService.Services.Auth
{
    public interface IAuthManager
    {
        // Authentication
        Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);

        Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);

        Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId);


        // Admin user management
        Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync();

        Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId);

        Task<ServiceResultDto<List<UserLookupResponseDto>>> GetUsersByIdsAsync(List<int> userIds);

        Task<ServiceResultDto<AdminUserResponseDto>> UpdateUserRoleAsync(int userId, UserRole role);

        Task<ServiceResultDto> DeleteUserAsync(int userId);
    }
}