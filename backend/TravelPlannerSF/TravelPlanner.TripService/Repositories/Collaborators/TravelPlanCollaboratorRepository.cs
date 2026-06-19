using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Collaborators;

namespace TravelPlanner.TripService.Repositories.Collaborators
{
    public class TravelPlanCollaboratorRepository : ITravelPlanCollaboratorRepository
    {
        private readonly TripDbContext context;

        public TravelPlanCollaboratorRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<TravelPlanCollaborator?> GetByPlanAndUserAsync(int travelPlanId, int userId)
        {
            return await context.TravelPlanCollaborators
                .FirstOrDefaultAsync(collaborator =>
                    collaborator.TravelPlanId == travelPlanId &&
                    collaborator.UserId == userId);
        }

        public async Task<TravelPlanCollaborator> CreateAsync(TravelPlanCollaborator collaborator)
        {
            context.TravelPlanCollaborators.Add(collaborator);

            await context.SaveChangesAsync();

            return collaborator;
        }
    }
}