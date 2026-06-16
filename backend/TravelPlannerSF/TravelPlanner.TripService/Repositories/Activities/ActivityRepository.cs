using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Activities;

namespace TravelPlanner.TripService.Repositories.Activities
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly TripDbContext context;

        public ActivityRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<Activity> CreateAsync(Activity activity)
        {
            context.Activities.Add(activity);

            await context.SaveChangesAsync();

            return activity;
        }

        public async Task<List<Activity>> GetByDestinationIdAsync(int destinationId)
        {
            return await context.Activities
                .Where(activity => activity.DestinationId == destinationId)
                .OrderBy(activity => activity.ActivityDate)
                .ThenBy(activity => activity.StartTime)
                .ToListAsync();
        }

        public async Task<List<Activity>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.Activities
                .Include(activity => activity.Destination)
                .Where(activity => activity.Destination.TravelPlanId == travelPlanId)
                .OrderBy(activity => activity.ActivityDate)
                .ThenBy(activity => activity.StartTime)
                .ToListAsync();
        }

        public async Task<Activity?> GetByIdAsync(int activityId)
        {
            return await context.Activities
                .FirstOrDefaultAsync(activity =>
                    activity.Id == activityId);
        }

        public async Task UpdateAsync(Activity activity)
        {
            context.Activities.Update(activity);

            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Activity activity)
        {
            context.Activities.Remove(activity);

            await context.SaveChangesAsync();
        }
    }
}