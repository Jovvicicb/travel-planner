using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;

namespace TravelPlanner.TripService.Services.Destinations
{
    public interface IDestinationManager
    {
        Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command);
    }
}