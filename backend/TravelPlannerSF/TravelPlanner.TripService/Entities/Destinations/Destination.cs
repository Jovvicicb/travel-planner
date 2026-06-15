using TravelPlanner.TripService.Entities.Activities;

namespace TravelPlanner.TripService.Entities.Destinations
{
    public class Destination
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public TravelPlans.TravelPlan TravelPlan { get; set; } = null!;

        public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    }
}