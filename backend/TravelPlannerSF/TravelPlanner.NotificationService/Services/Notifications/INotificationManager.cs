using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;

namespace TravelPlanner.NotificationService.Services.Notifications
{
    public interface INotificationManager
    {
        Task<ServiceResultDto<ReminderResponseDto>> CreateReminderAsync(CreateReminderCommandDto command);

        Task<ServiceResultDto<ReminderResponseDto>> GetReminderAsync(Guid reminderId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<ReminderResponseDto>>> GetRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<ReminderResponseDto>>> GetActiveRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<ReminderResponseDto>>> GetTriggeredRemindersAsync(int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<ReminderResponseDto>>> GetCompletedRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ReminderResponseDto>> UpdateReminderAsync(UpdateReminderCommandDto command);

        Task<ServiceResultDto<ReminderResponseDto>> CompleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto> DeleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin);
    }
}