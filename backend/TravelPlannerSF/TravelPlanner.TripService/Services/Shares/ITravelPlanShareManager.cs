using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Shares;

namespace TravelPlanner.TripService.Services.Shares
{
    public interface ITravelPlanShareManager
    {
        Task<ServiceResultDto<TravelPlanShareResponseDto>> CreateShareAsync(CreateTravelPlanShareCommandDto command);

        Task<ServiceResultDto<SharedTravelPlanViewDto>> GetSharedTravelPlanAsync(string token);

        Task<ServiceResultDto<List<TravelPlanShareResponseDto>>> GetSharesAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto> DeactivateShareAsync(int travelPlanId, int shareId, int requestUserId, bool isAdmin);
    }
}