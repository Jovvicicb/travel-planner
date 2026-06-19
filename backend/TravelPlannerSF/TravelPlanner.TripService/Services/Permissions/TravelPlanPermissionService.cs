using TravelPlanner.TripService.Entities.TravelPlans;
using TravelPlanner.TripService.Repositories.Collaborators;

namespace TravelPlanner.TripService.Services.Permissions
{
    public class TravelPlanPermissionService : ITravelPlanPermissionService
    {
        private readonly ITravelPlanCollaboratorRepository collaboratorRepository;

        public TravelPlanPermissionService(
            ITravelPlanCollaboratorRepository collaboratorRepository)
        {
            this.collaboratorRepository = collaboratorRepository;
        }

        public async Task<bool> CanViewAsync(TravelPlan travelPlan, int requestUserId, bool isAdmin)
        {
            if (isAdmin || travelPlan.OwnerUserId == requestUserId)
            {
                return true;
            }

            return await collaboratorRepository.HasEditAccessAsync(travelPlan.Id, requestUserId);
        }

        public async Task<bool> CanEditAsync(TravelPlan travelPlan, int requestUserId, bool isAdmin)
        {
            if (isAdmin || travelPlan.OwnerUserId == requestUserId)
            {
                return true;
            }

            return await collaboratorRepository.HasEditAccessAsync(travelPlan.Id, requestUserId);
        }
    }
}