using Microsoft.EntityFrameworkCore;
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

        public async Task<List<ChecklistItem>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.ChecklistItems
                .Where(item => item.TravelPlanId == travelPlanId)
                .OrderBy(item => item.IsCompleted)
                .ThenByDescending(item => item.CreatedAt)
                .ToListAsync();
        }

        public async Task<ChecklistItem?> GetByIdAsync(int itemId)
        {
            return await context.ChecklistItems
                .FirstOrDefaultAsync(item => item.Id == itemId);
        }

        public async Task UpdateAsync(ChecklistItem item)
        {
            context.ChecklistItems.Update(item);

            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ChecklistItem item)
        {
            context.ChecklistItems.Remove(item);

            await context.SaveChangesAsync();
        }
    }
}