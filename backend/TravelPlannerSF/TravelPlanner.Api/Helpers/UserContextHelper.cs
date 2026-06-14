using System.Security.Claims;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Api.Helpers
{
    public static class UserContextHelper
    {
        public static (int UserId, bool IsAdmin)? GetUserContext(ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = user.FindFirst(ClaimTypes.Role)?.Value;

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return null;
            }

            var isAdmin = roleClaim == UserRole.Admin.ToString();

            return (userId, isAdmin);
        }
    }
}