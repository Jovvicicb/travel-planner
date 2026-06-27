using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class TravelPlanCollaboratorResponseDto
    {
        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public ShareAccessLevel AccessLevel { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}