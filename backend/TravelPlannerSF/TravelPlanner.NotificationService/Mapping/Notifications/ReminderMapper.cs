using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.NotificationService.Entities.Notifications;

namespace TravelPlanner.NotificationService.Mapping.Notifications
{
    public static class ReminderMapper
    {
        public static ReminderResponseDto ToResponse(Reminder reminder)
        {
            return new ReminderResponseDto
            {
                Id = reminder.Id,
                TravelPlanId = reminder.TravelPlanId,
                UserId = reminder.UserId,
                Title = reminder.Title,
                Description = reminder.Description,
                ReminderAt = reminder.ReminderAt,
                Status = reminder.Status,
                CreatedAt = reminder.CreatedAt,
                CompletedAt = reminder.CompletedAt
            };
        }
    }
}