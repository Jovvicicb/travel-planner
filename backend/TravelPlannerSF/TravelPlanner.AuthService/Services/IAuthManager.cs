using TravelPlanner.Contracts.DTOs.Auth;

namespace TravelPlanner.AuthService.Services
{
    public interface IAuthManager
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);

        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);

        Task<CurrentUserDto?> GetCurrentUserAsync(int userId);
    }
}