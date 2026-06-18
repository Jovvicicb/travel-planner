using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class CreateTravelPlanShareCommandDto
    {
        public int TravelPlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public ShareAccessLevel AccessLevel { get; set; } = ShareAccessLevel.View;

        public DateTime? ExpiresAt { get; set; }
    }
}