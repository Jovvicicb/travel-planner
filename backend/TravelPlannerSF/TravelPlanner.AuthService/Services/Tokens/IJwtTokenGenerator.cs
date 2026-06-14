using TravelPlanner.AuthService.Entities;

namespace TravelPlanner.AuthService.Services.Tokens
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}