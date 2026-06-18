using TravelPlanner.TripService.Entities.Shares;

namespace TravelPlanner.TripService.Repositories.Shares
{
    public interface ITravelPlanShareRepository
    {
        Task<TravelPlanShare> CreateAsync(TravelPlanShare share);

        Task<TravelPlanShare?> GetByTokenAsync(string token);
    }
}