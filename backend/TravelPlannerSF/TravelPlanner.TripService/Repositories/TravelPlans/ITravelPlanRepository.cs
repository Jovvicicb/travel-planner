using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Repositories.TravelPlans
{
    public interface ITravelPlanRepository
    {
        Task<TravelPlan> CreateAsync(TravelPlan plan);
    }
}