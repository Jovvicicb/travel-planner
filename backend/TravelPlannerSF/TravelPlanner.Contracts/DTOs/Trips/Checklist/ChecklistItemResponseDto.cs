namespace TravelPlanner.Contracts.DTOs.Trips.Checklist
{
    public class ChecklistItemResponseDto
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}