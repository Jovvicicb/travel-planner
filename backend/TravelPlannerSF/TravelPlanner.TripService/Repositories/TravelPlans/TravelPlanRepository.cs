using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Repositories.TravelPlans
{
    public class TravelPlanRepository : ITravelPlanRepository
    {
        private readonly TripDbContext context;

        public TravelPlanRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<TravelPlan> CreateAsync(TravelPlan plan)
        {
            context.TravelPlans.Add(plan);

            await context.SaveChangesAsync();

            return plan;
        }

        public async Task<List<TravelPlan>> GetAllAsync()
        {
            return await context.TravelPlans
                .OrderByDescending(plan => plan.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<TravelPlan>> GetByOwnerIdAsync(int ownerUserId)
        {
            return await context.TravelPlans
                .Where(plan => plan.OwnerUserId == ownerUserId)
                .OrderByDescending(plan => plan.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<TravelPlan>> GetByIdsAsync(List<int> planIds)
        {
            return await context.TravelPlans
                .Where(plan => planIds.Contains(plan.Id))
                .OrderByDescending(plan => plan.CreatedAt)
                .ToListAsync();
        }

        public async Task<TravelPlan?> GetByIdAsync(int planId)
        {
            return await context.TravelPlans
                .FirstOrDefaultAsync(plan => plan.Id == planId);
        }

        public async Task UpdateAsync(TravelPlan plan)
        {
            context.TravelPlans.Update(plan);

            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TravelPlan plan)
        {
            context.TravelPlans.Remove(plan);

            await context.SaveChangesAsync();
        }
    }
}