using TravelPlanner.TripService.Entities.Activities;

namespace TravelPlanner.TripService.Repositories.Activities
{
    public interface IActivityRepository
    {
        Task<Activity> CreateAsync(Activity activity);
    }
}