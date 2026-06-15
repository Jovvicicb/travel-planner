using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;

namespace TravelPlanner.Contracts.Interfaces.Trips
{
    public interface ITripService : IService
    {
        //TravelPlan
        Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command);

        Task<ServiceResultDto<List<TravelPlanListItemDto>>> GetTravelPlansAsync(int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> GetTravelPlanByIdAsync(int planId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> UpdateTravelPlanAsync(UpdateTravelPlanCommandDto command);

        Task<ServiceResultDto> DeleteTravelPlanAsync(int planId, int requestUserId, bool isAdmin);

        //Destination
        Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command);

        Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<DestinationResponseDto>> UpdateDestinationAsync(UpdateDestinationCommandDto command);

        Task<ServiceResultDto> DeleteDestinationAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin);
    }
}