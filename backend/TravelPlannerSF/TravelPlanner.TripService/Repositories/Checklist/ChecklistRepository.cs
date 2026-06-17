using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Checklist;

namespace TravelPlanner.TripService.Repositories.Checklist
{
    public class ChecklistRepository : IChecklistRepository
    {
        private readonly TripDbContext context;

        public ChecklistRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<ChecklistItem> CreateAsync(ChecklistItem item)
        {
            context.ChecklistItems.Add(item);

            await context.SaveChangesAsync();

            return item;
        }
    }
}