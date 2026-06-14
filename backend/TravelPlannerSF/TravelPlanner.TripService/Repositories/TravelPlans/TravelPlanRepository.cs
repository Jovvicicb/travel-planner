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
    }
}