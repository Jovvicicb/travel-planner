using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;

namespace TravelPlanner.Contracts.Interfaces
{
    public interface IAuthService : IService
    {
        Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);

        Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);

        Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId);

        Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync();

        Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId);
    }
}