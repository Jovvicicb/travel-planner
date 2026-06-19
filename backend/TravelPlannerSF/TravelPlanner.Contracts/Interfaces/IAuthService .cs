using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.Interfaces
{
    public interface IAuthService : IService
    {
        Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);

        Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);

        Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId);

        Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync();

        Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId);

        Task<ServiceResultDto<AdminUserResponseDto>> UpdateUserRoleAsync(int userId, UserRole role);
    }
}