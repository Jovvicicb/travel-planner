using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Entities.Activities
{
    public class Activity
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }

        public string Title { get; set; } = string.Empty;

        public DateTime ActivityDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public string Location { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal EstimatedCost { get; set; }

        public ActivityStatus Status { get; set; } = ActivityStatus.Planned;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public Destination Destination { get; set; } = null!;
    }
}