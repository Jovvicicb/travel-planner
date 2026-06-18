using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;

namespace TravelPlanner.TripService.Services.Checklist
{
    public interface IChecklistManager
    {
        Task<ServiceResultDto<ChecklistItemResponseDto>> CreateChecklistItemAsync(CreateChecklistItemCommandDto command);

        Task<ServiceResultDto<List<ChecklistItemResponseDto>>> GetChecklistItemsAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ChecklistItemResponseDto>> UpdateChecklistItemAsync(UpdateChecklistItemCommandDto command);

        Task<ServiceResultDto<ChecklistItemResponseDto>> ToggleChecklistItemAsync(int travelPlanId, int itemId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto> DeleteChecklistItemAsync(int travelPlanId, int itemId, int requestUserId, bool isAdmin);
    }
}