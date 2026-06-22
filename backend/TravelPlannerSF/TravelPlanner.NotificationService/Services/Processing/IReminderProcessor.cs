namespace TravelPlanner.NotificationService.Services.Processing
{
    public interface IReminderProcessor
    {
        Task ProcessDueRemindersAsync();
    }
}