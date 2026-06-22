using TravelPlanner.Contracts.Enums;
using TravelPlanner.NotificationService.Repositories.Notifications;
using TravelPlanner.NotificationService.Services.State;

namespace TravelPlanner.NotificationService.Services.Processing
{
    public class ReminderProcessor : IReminderProcessor
    {
        private readonly IReminderRepository reminderRepository;
        private readonly IReminderStateStore reminderStateStore;

        public ReminderProcessor(
            IReminderRepository reminderRepository,
            IReminderStateStore reminderStateStore)
        {
            this.reminderRepository = reminderRepository;
            this.reminderStateStore = reminderStateStore;
        }

        public async Task ProcessDueRemindersAsync()
        {
            var remindersToTrigger = await reminderStateStore.GetReadyToTriggerAsync(DateTime.Now);

            foreach (var reminderState in remindersToTrigger)
            {
                var reminder = await reminderRepository.GetByIdAsync(reminderState.Id);

                if (reminder == null)
                {
                    await reminderStateStore.RemoveAsync(reminderState.Id);
                    continue;
                }

                if (reminder.Status != ReminderStatus.Pending)
                {
                    await reminderStateStore.RemoveAsync(reminder.Id);
                    continue;
                }

                reminder.Status = ReminderStatus.Triggered;
                reminder.CompletedAt = null;

                await reminderRepository.UpdateAsync(reminder);
                await reminderStateStore.RemoveAsync(reminder.Id);
            }
        }
    }
}