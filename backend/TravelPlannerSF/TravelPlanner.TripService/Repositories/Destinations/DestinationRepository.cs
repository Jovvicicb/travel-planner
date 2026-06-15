using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Repositories.Destinations
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly TripDbContext context;

        public DestinationRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<Destination> CreateAsync(Destination destination)
        {
            context.Destinations.Add(destination);

            await context.SaveChangesAsync();

            return destination;
        }

        public async Task<List<Destination>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.Destinations
                .Where(destination => destination.TravelPlanId == travelPlanId)
                .OrderBy(destination => destination.StartDate)
                .ToListAsync();
        }
    }
}