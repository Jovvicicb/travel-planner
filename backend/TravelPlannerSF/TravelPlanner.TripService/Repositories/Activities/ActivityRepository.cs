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
    }
}