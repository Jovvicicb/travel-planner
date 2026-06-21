using TravelPlanner.Contracts.Enums;
using TravelPlanner.NotificationService.Entities.Notifications;

namespace TravelPlanner.NotificationService.Repositories.Notifications
{
    public interface IReminderRepository
    {
        Task<Reminder> CreateAsync(Reminder reminder);

        Task<Reminder?> GetByIdAsync(Guid reminderId);

        Task<List<Reminder>> GetByTravelPlanIdAsync(int travelPlanId);

        Task<List<Reminder>> GetByTravelPlanIdAndStatusAsync(int travelPlanId, ReminderStatus status);

        Task UpdateAsync(Reminder reminder);

        Task DeleteAsync(Reminder reminder);
    }
}