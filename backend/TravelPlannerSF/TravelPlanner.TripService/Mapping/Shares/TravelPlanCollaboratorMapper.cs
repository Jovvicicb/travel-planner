using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.TripService.Entities.Collaborators;

namespace TravelPlanner.TripService.Mapping.Shares
{
    public static class TravelPlanCollaboratorMapper
    {
        public static TravelPlanCollaboratorResponseDto ToResponse(TravelPlanCollaborator collaborator)
        {
            return new TravelPlanCollaboratorResponseDto
            {
                TravelPlanId = collaborator.TravelPlanId,
                UserId = collaborator.UserId,
                AccessLevel = collaborator.AccessLevel,
                CreatedAt = collaborator.CreatedAt
            };
        }
    }
}