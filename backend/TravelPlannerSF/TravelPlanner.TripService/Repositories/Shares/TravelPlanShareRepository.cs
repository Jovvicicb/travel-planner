using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Shares;

namespace TravelPlanner.TripService.Repositories.Shares
{
    public class TravelPlanShareRepository : ITravelPlanShareRepository
    {
        private readonly TripDbContext context;

        public TravelPlanShareRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<TravelPlanShare> CreateAsync(TravelPlanShare share)
        {
            context.TravelPlanShares.Add(share);

            await context.SaveChangesAsync();

            return share;
        }

        public async Task<TravelPlanShare?> GetByTokenAsync(string token)
        {
            return await context.TravelPlanShares
                .FirstOrDefaultAsync(share => share.Token == token);
        }

        public async Task<List<TravelPlanShare>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.TravelPlanShares
                .Where(share => share.TravelPlanId == travelPlanId)
                .OrderByDescending(share => share.CreatedAt)
                .ToListAsync();
        }
    }
}