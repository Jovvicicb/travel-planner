namespace TravelPlanner.Contracts.DTOs.Notifications
{
    public class CreateReminderRequestDto
    {
        public int TravelPlanId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }
    }
}