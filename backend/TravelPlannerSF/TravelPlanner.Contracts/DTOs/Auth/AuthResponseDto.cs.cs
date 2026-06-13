namespace TravelPlanner.Contracts.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;

        public CurrentUserDto User { get; set; } = null!;
    }
}