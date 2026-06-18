using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class CreateTravelPlanShareRequestDto
    {
        public ShareAccessLevel AccessLevel { get; set; } = ShareAccessLevel.View;

        public DateTime? ExpiresAt { get; set; }
    }
}