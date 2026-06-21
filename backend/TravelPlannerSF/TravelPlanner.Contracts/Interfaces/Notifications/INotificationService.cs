using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;

namespace TravelPlanner.Contracts.Interfaces.Notifications
{
    // Service Fabric Remoting contract for travel reminder operations.
    public interface INotificationService : IService
    {
        Task<ServiceResultDto<ReminderResponseDto>> CreateReminderAsync(CreateReminderCommandDto command);

        Task<ServiceResultDto<ReminderResponseDto>> GetReminderAsync(Guid reminderId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<ReminderResponseDto>>> GetRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin);
    }
}