using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Repositories.Destinations
{
    public interface IDestinationRepository
    {
        Task<Destination> CreateAsync(Destination destination);

        Task<List<Destination>> GetByTravelPlanIdAsync(int travelPlanId);

        Task<Destination?> GetByIdAsync(int destinationId);

        Task UpdateAsync(Destination destination);
    }
}