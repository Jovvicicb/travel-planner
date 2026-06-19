using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Auth
{
    public class UpdateUserRoleRequestDto
    {
        public UserRole Role { get; set; }
    }
}