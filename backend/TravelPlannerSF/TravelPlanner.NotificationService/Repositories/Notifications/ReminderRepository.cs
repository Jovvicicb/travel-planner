using TravelPlanner.NotificationService.Data;
using TravelPlanner.NotificationService.Entities.Notifications;

namespace TravelPlanner.NotificationService.Repositories.Notifications
{
    public class ReminderRepository : IReminderRepository
    {
        private readonly NotificationDbContext context;

        public ReminderRepository(NotificationDbContext context)
        {
            this.context = context;
        }

        public async Task<Reminder> CreateAsync(Reminder reminder)
        {
            context.Reminders.Add(reminder);

            await context.SaveChangesAsync();

            return reminder;
        }
    }
}