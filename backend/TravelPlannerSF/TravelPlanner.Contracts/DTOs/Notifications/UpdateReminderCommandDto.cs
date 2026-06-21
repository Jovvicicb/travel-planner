namespace TravelPlanner.Contracts.DTOs.Notifications
{
    public class UpdateReminderCommandDto
    {
        public Guid ReminderId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }
    }
}