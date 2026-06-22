using Microsoft.EntityFrameworkCore;
using TravelPlanner.Contracts.Enums;
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

        public async Task<Reminder?> GetByIdAsync(Guid reminderId)
        {
            return await context.Reminders
                .FirstOrDefaultAsync(reminder => reminder.Id == reminderId);
        }

        public async Task<List<Reminder>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.Reminders
                .Where(reminder => reminder.TravelPlanId == travelPlanId)
                .OrderBy(reminder => reminder.ReminderAt)
                .ThenByDescending(reminder => reminder.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Reminder>> GetByTravelPlanIdAndStatusAsync(int travelPlanId, ReminderStatus status)
        {
            return await context.Reminders
                .Where(reminder =>
                    reminder.TravelPlanId == travelPlanId &&
                    reminder.Status == status)
                .OrderBy(reminder => reminder.ReminderAt)
                .ThenByDescending(reminder => reminder.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Reminder>> GetByStatusAsync(ReminderStatus status)
        {
            return await context.Reminders
                .Where(reminder => reminder.Status == status)
                .OrderBy(reminder => reminder.ReminderAt)
                .ToListAsync();
        }

        public async Task UpdateAsync(Reminder reminder)
        {
            context.Reminders.Update(reminder);

            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Reminder reminder)
        {
            context.Reminders.Remove(reminder);

            await context.SaveChangesAsync();
        }
    }
}