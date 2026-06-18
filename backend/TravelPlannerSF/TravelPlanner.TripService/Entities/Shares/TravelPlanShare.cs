using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Entities.Shares
{
    public class TravelPlanShare
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Token { get; set; } = string.Empty;

        public ShareAccessLevel AccessLevel { get; set; } = ShareAccessLevel.View;

        public DateTime? ExpiresAt { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public TravelPlan TravelPlan { get; set; } = null!;
    }
}