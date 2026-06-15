using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;

namespace TravelPlanner.TripService.Services.Destinations
{
    public interface IDestinationManager
    {
        Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command);

        Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin);
    }
}