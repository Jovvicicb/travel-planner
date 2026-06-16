using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;

namespace TravelPlanner.TripService.Services.Activities
{
    public interface IActivityManager
    {
        Task<ServiceResultDto<ActivityResponseDto>> CreateActivityAsync(CreateActivityCommandDto command);

        Task<ServiceResultDto<List<ActivityResponseDto>>> GetActivitiesAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ActivityResponseDto>> UpdateActivityAsync(UpdateActivityCommandDto command);
    }
}