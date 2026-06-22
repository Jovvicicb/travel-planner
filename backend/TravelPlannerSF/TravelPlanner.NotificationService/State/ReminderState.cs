using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.NotificationService.State
{
    public class ReminderState
    {
        public Guid Id { get; set; }

        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime ReminderAt { get; set; }

        public ReminderStatus Status { get; set; }
    }
}