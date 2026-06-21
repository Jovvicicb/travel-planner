namespace TravelPlanner.Contracts.DTOs.Notifications
{
    public class CreateReminderCommandDto
    {
        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }
    }
}