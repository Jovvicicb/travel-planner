namespace TravelPlanner.Contracts.DTOs.Notifications
{
    public class UpdateReminderRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }
    }
}