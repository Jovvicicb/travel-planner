using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Entities.Collaborators
{
    public class TravelPlanCollaborator
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public ShareAccessLevel AccessLevel { get; set; } = ShareAccessLevel.Edit;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public TravelPlan TravelPlan { get; set; } = null!;
    }
}