using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Activities
{
    public class CreateActivityCommandDto
    {
        public int TravelPlanId { get; set; }

        public int DestinationId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public DateTime ActivityDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public string Location { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal EstimatedCost { get; set; }

        public ActivityStatus Status { get; set; } = ActivityStatus.Planned;
    }
}