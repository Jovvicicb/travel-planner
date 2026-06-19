using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Auth
{
    public class AdminUserResponseDto
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public UserRole Role { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}