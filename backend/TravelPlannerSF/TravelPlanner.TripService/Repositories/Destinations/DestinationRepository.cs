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

        public async Task<Destination?> GetByIdAsync(int destinationId)
        {
            return await context.Destinations
                .FirstOrDefaultAsync(destination =>
                    destination.Id == destinationId);
        }

        public async Task UpdateAsync(Destination destination)
        {
            context.Destinations.Update(destination);

            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Destination destination)
        {
            context.Destinations.Remove(destination);

            await context.SaveChangesAsync();
        }
    }
}