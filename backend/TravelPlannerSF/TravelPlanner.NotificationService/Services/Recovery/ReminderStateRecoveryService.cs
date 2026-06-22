using TravelPlanner.Contracts.Enums;
using TravelPlanner.NotificationService.Mapping.Notifications;
using TravelPlanner.NotificationService.Repositories.Notifications;
using TravelPlanner.NotificationService.Services.State;

namespace TravelPlanner.NotificationService.Services.Recovery
{
    public class ReminderStateRecoveryService : IReminderStateRecoveryService
    {
        private readonly IReminderRepository reminderRepository;
        private readonly IReminderStateStore reminderStateStore;

        public ReminderStateRecoveryService(
            IReminderRepository reminderRepository,
            IReminderStateStore reminderStateStore)
        {
            this.reminderRepository = reminderRepository;
            this.reminderStateStore = reminderStateStore;
        }

        public async Task RecoverAsync()
        {
            await reminderStateStore.ClearAsync();

            var pendingReminders = await reminderRepository.GetByStatusAsync(ReminderStatus.Pending);

            foreach (var reminder in pendingReminders)
            {
                await reminderStateStore.UpsertAsync(
                    ReminderMapper.ToState(reminder)
                );
            }
        }
    }
}