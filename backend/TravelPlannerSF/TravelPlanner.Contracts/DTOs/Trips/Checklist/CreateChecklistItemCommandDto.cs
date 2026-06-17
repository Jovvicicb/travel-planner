namespace TravelPlanner.Contracts.DTOs.Trips.Checklist
{
    public class CreateChecklistItemCommandDto
    {
        public int TravelPlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;
    }
}