using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;

namespace TravelPlanner.AuthService.Services
{
    public interface IAuthManager
    {
        Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);

        Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);

        Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId);
    }
}