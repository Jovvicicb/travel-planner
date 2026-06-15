using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;

namespace TravelPlanner.TripService.Services.Destinations
{
    public interface IDestinationManager
    {
        Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command);

        Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<DestinationResponseDto>> UpdateDestinationAsync(UpdateDestinationCommandDto command);

        Task<ServiceResultDto> DeleteDestinationAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin);
    }
}