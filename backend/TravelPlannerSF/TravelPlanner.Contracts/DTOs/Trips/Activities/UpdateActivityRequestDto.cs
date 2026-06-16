using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Activities
{
    public class UpdateActivityRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public DateTime ActivityDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public string Location { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal EstimatedCost { get; set; }

        public ActivityStatus Status { get; set; }
    }
}