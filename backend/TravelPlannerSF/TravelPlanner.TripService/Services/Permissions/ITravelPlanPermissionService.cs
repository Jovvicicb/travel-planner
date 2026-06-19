using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Services.Permissions
{
    public interface ITravelPlanPermissionService
    {
        Task<bool> CanViewAsync(TravelPlan travelPlan, int requestUserId, bool isAdmin);

        Task<bool> CanEditAsync(TravelPlan travelPlan, int requestUserId, bool isAdmin);
    }
}