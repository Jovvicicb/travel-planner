namespace TravelPlanner.Contracts.DTOs.Trips.Checklist
{
    public class UpdateChecklistItemCommandDto
    {
        public int TravelPlanId { get; set; }

        public int ItemId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }
    }
}