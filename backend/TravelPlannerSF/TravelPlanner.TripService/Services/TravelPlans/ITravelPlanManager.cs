using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;

namespace TravelPlanner.TripService.Services.TravelPlans
{
    public interface ITravelPlanManager
    {
        Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command);
    }
}