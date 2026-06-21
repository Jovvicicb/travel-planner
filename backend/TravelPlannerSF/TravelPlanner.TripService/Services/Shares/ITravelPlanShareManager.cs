using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Shares;

namespace TravelPlanner.TripService.Services.Shares
{
    public interface ITravelPlanShareManager
    {
        // Sharing
        Task<ServiceResultDto<TravelPlanShareResponseDto>> CreateShareAsync(CreateTravelPlanShareCommandDto command);

        Task<ServiceResultDto<SharedTravelPlanViewDto>> GetSharedTravelPlanAsync(string token);

        Task<ServiceResultDto<List<TravelPlanShareResponseDto>>> GetSharesAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto> DeactivateShareAsync(int travelPlanId, int shareId, int requestUserId, bool isAdmin);


        // Collaborators
        Task<ServiceResultDto<ClaimShareResponseDto>> ClaimEditShareAsync(string token, int requestUserId);

        Task<ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>> GetCollaboratorsAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto> RemoveCollaboratorAsync(int travelPlanId, int collaboratorUserId, int requestUserId, bool isAdmin);
    }
}