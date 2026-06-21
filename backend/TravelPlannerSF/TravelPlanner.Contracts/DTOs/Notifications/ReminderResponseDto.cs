using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Notifications
{
    public class ReminderResponseDto
    {
        public Guid Id { get; set; }

        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }

        public ReminderStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }
    }
}