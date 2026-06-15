using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;

namespace TravelPlanner.Contracts.Interfaces.Trips
{
    public interface ITripService : IService
    {
        Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command);

        Task<ServiceResultDto<List<TravelPlanListItemDto>>> GetTravelPlansAsync(int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> GetTravelPlanByIdAsync(int planId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> UpdateTravelPlanAsync(UpdateTravelPlanCommandDto command);

        Task<ServiceResultDto> DeleteTravelPlanAsync(int planId, int requestUserId, bool isAdmin);
    }
}