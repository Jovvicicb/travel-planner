using TravelPlanner.AuthService.Entities;
using TravelPlanner.Contracts.DTOs.Auth;

namespace TravelPlanner.AuthService.Mapping.Auth
{
    public static class AuthMapper
    {
        public static CurrentUserDto ToCurrentUser(User user)
        {
            return new CurrentUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
        }

        public static AuthResponseDto ToAuthResponse(User user, string token)
        {
            return new AuthResponseDto
            {
                Token = token,
                User = ToCurrentUser(user)
            };
        }

        public static AdminUserResponseDto ToAdminUserResponse(User user)
        {
            return new AdminUserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }
    }
}