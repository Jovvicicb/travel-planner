namespace TravelPlanner.Contracts.DTOs.Trips.Checklist
{
    public class UpdateChecklistItemRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }
    }
}