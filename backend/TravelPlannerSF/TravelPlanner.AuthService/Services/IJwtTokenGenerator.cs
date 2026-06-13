using TravelPlanner.AuthService.Entities;

namespace TravelPlanner.AuthService.Services
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}