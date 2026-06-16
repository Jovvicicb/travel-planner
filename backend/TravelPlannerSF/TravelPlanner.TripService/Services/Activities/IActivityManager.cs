using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;

namespace TravelPlanner.TripService.Services.Activities
{
    public interface IActivityManager
    {
        Task<ServiceResultDto<ActivityResponseDto>> CreateActivityAsync(CreateActivityCommandDto command);
    }
}