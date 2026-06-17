using TravelPlanner.TripService.Entities.Checklist;

namespace TravelPlanner.TripService.Repositories.Checklist
{
    public interface IChecklistRepository
    {
        Task<ChecklistItem> CreateAsync(ChecklistItem item);
    }
}