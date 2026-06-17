using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;

namespace TravelPlanner.TripService.Services.Checklist
{
    public interface IChecklistManager
    {
        Task<ServiceResultDto<ChecklistItemResponseDto>> CreateChecklistItemAsync(CreateChecklistItemCommandDto command);
    }
}