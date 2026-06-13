using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Auth;

namespace TravelPlanner.Contracts.Interfaces
{
    public interface IAuthService : IService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);

        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);

        Task<CurrentUserDto?> GetCurrentUserAsync(int userId);
    }
}