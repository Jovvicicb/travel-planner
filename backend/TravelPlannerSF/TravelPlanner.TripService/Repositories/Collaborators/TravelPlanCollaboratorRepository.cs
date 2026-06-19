using Microsoft.EntityFrameworkCore;
using TravelPlanner.Contracts.Enums;
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

        public async Task<bool> HasEditAccessAsync(int travelPlanId, int userId)
        {
            return await context.TravelPlanCollaborators
                .AnyAsync(collaborator =>
                    collaborator.TravelPlanId == travelPlanId &&
                    collaborator.UserId == userId &&
                    collaborator.AccessLevel == ShareAccessLevel.Edit);
        }

        public async Task<List<int>> GetTravelPlanIdsByUserIdAsync(int userId)
        {
            return await context.TravelPlanCollaborators
                .Where(collaborator => collaborator.UserId == userId)
                .Select(collaborator => collaborator.TravelPlanId)
                .ToListAsync();
        }
    }
}