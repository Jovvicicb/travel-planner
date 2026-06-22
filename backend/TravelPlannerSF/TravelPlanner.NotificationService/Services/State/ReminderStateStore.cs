using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.NotificationService.State;

namespace TravelPlanner.NotificationService.Services.State
{
    public class ReminderStateStore : IReminderStateStore
    {
        private const string RemindersDictionaryName = "active-reminders";

        private readonly IReliableStateManager stateManager;

        public ReminderStateStore(IReliableStateManager stateManager)
        {
            this.stateManager = stateManager;
        }

        public async Task UpsertAsync(ReminderState reminder)
        {
            var dictionary = await stateManager.GetOrAddAsync<IReliableDictionary<Guid, ReminderState>>(
                RemindersDictionaryName
            );

            using var transaction = stateManager.CreateTransaction();

            await dictionary.AddOrUpdateAsync(
                transaction,
                reminder.Id,
                reminder,
                (key, oldValue) => reminder
            );

            await transaction.CommitAsync();
        }

        public async Task RemoveAsync(Guid reminderId)
        {
            var dictionary = await stateManager.GetOrAddAsync<IReliableDictionary<Guid, ReminderState>>(
                RemindersDictionaryName
            );

            using var transaction = stateManager.CreateTransaction();

            await dictionary.TryRemoveAsync(transaction, reminderId);

            await transaction.CommitAsync();
        }

        public async Task<List<ReminderState>> GetReadyToTriggerAsync(DateTime currentTime)
        {
            var dictionary = await stateManager.GetOrAddAsync<IReliableDictionary<Guid, ReminderState>>(
                RemindersDictionaryName
            );

            using var transaction = stateManager.CreateTransaction();

            var enumerable = await dictionary.CreateEnumerableAsync(transaction);

            var enumerator = enumerable.GetAsyncEnumerator();

            var dueReminders = new List<ReminderState>();

            while (await enumerator.MoveNextAsync(CancellationToken.None))
            {
                var reminder = enumerator.Current.Value;

                if (reminder.Status == ReminderStatus.Pending &&
                    reminder.ReminderAt <= currentTime)
                {
                    dueReminders.Add(reminder);
                }
            }

            return dueReminders
                .OrderBy(reminder => reminder.ReminderAt)
                .ToList();
        }

        public async Task ClearAsync()
        {
            var dictionary = await stateManager.GetOrAddAsync<IReliableDictionary<Guid, ReminderState>>(
                RemindersDictionaryName
            );

            await dictionary.ClearAsync(
                TimeSpan.FromSeconds(10),
                CancellationToken.None
            );
        }
    }
}