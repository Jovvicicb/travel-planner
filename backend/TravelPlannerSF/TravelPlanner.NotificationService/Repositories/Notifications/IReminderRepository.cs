using TravelPlanner.NotificationService.Entities.Notifications;

namespace TravelPlanner.NotificationService.Repositories.Notifications
{
    public interface IReminderRepository
    {
        Task<Reminder> CreateAsync(Reminder reminder);
    }
}