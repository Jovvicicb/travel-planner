using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.TripService.Entities.Collaborators;

namespace TravelPlanner.TripService.Mapping.Shares
{
    public static class TravelPlanCollaboratorMapper
    {
        public static TravelPlanCollaboratorResponseDto ToResponse(
            TravelPlanCollaborator collaborator,
            UserLookupResponseDto? user)
        {
            return new TravelPlanCollaboratorResponseDto
            {
                TravelPlanId = collaborator.TravelPlanId,
                UserId = collaborator.UserId,
                FullName = user?.FullName ?? $"User #{collaborator.UserId}",
                Email = user?.Email ?? string.Empty,
                AccessLevel = collaborator.AccessLevel,
                CreatedAt = collaborator.CreatedAt
            };
        }
    }
}