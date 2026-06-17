using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Entities.Checklist
{
    public class ChecklistItem
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public TravelPlan TravelPlan { get; set; } = null!;
    }
}