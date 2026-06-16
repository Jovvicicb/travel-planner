using TravelPlanner.TripService.Entities.Activities;

namespace TravelPlanner.TripService.Repositories.Activities
{
    public interface IActivityRepository
    {
        Task<Activity> CreateAsync(Activity activity);

        Task<List<Activity>> GetByDestinationIdAsync(int destinationId);

        Task<Activity?> GetByIdAsync(int activityId);

        Task UpdateAsync(Activity activity);

        Task DeleteAsync(Activity activity);
    }
}