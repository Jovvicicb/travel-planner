using TravelPlanner.TripService.Entities.Checklist;
using TravelPlanner.TripService.Entities.Destinations;
using TravelPlanner.TripService.Entities.Expenses;
using TravelPlanner.TripService.Entities.Shares;

namespace TravelPlanner.TripService.Entities.TravelPlans
{
    public class TravelPlan
    {
        public int Id { get; set; }

        public int OwnerUserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal Budget { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public ICollection<Destination> Destinations { get; set; } = new List<Destination>();

        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();

        public ICollection<ChecklistItem> ChecklistItems { get; set; } = new List<ChecklistItem>();

        public ICollection<TravelPlanShare> Shares { get; set; } = new List<TravelPlanShare>();
    }
}