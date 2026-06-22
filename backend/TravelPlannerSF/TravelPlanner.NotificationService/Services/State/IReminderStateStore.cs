using TravelPlanner.NotificationService.State;

namespace TravelPlanner.NotificationService.Services.State
{
    public interface IReminderStateStore
    {
        Task UpsertAsync(ReminderState reminder);

        Task RemoveAsync(Guid reminderId);
    }
}