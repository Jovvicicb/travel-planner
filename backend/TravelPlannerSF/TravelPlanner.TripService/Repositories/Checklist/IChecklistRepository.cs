using TravelPlanner.TripService.Entities.Checklist;

namespace TravelPlanner.TripService.Repositories.Checklist
{
    public interface IChecklistRepository
    {
        Task<ChecklistItem> CreateAsync(ChecklistItem item);

        Task<List<ChecklistItem>> GetByTravelPlanIdAsync(int travelPlanId);

        Task<ChecklistItem?> GetByIdAsync(int itemId);

        Task UpdateAsync(ChecklistItem item);
    }
}