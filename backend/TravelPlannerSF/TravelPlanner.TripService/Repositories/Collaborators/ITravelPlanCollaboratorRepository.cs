using TravelPlanner.TripService.Entities.Collaborators;

namespace TravelPlanner.TripService.Repositories.Collaborators
{
    public interface ITravelPlanCollaboratorRepository
    {
        Task<TravelPlanCollaborator?> GetByPlanAndUserAsync(int travelPlanId, int userId);

        Task<TravelPlanCollaborator> CreateAsync(TravelPlanCollaborator collaborator);

        Task<bool> HasEditAccessAsync(int travelPlanId, int userId);

        Task<List<int>> GetTravelPlanIdsByUserIdAsync(int userId);
    }
}