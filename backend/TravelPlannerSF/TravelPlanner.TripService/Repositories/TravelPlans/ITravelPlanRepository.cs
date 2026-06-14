using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Repositories.TravelPlans
{
    public interface ITravelPlanRepository
    {
        Task<TravelPlan> CreateAsync(TravelPlan plan);

        Task<List<TravelPlan>> GetAllAsync();

        Task<List<TravelPlan>> GetByOwnerIdAsync(int ownerUserId);

        Task<TravelPlan?> GetByIdAsync(int planId);

        Task UpdateAsync(TravelPlan plan);
    }
}