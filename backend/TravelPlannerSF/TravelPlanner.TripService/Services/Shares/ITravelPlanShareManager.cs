using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Shares;

namespace TravelPlanner.TripService.Services.Shares
{
    public interface ITravelPlanShareManager
    {
        Task<ServiceResultDto<TravelPlanShareResponseDto>> CreateShareAsync(CreateTravelPlanShareCommandDto command);
    }
}