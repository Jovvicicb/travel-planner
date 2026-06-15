using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Mapping.Destinations
{
    public static class DestinationMapper
    {
        public static DestinationResponseDto ToResponse(Destination destination)
        {
            return new DestinationResponseDto
            {
                Id = destination.Id,
                TravelPlanId = destination.TravelPlanId,
                Name = destination.Name,
                Location = destination.Location,
                StartDate = destination.StartDate,
                EndDate = destination.EndDate,
                Notes = destination.Notes,
                CreatedAt = destination.CreatedAt,
                UpdatedAt = destination.UpdatedAt
            };
        }
    }
}