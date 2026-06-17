using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.TripService.Entities.Checklist;

namespace TravelPlanner.TripService.Mapping.Checklist
{
    public static class ChecklistMapper
    {
        public static ChecklistItemResponseDto ToResponse(ChecklistItem item)
        {
            return new ChecklistItemResponseDto
            {
                Id = item.Id,
                TravelPlanId = item.TravelPlanId,
                Title = item.Title,
                IsCompleted = item.IsCompleted,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt
            };
        }
    }
}