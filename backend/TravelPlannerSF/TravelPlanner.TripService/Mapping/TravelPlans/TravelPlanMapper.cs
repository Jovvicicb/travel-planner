using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Mapping.TravelPlans
{
    public static class TravelPlanMapper
    {
        public static TravelPlanResponseDto ToResponse(TravelPlan plan)
        {
            return new TravelPlanResponseDto
            {
                Id = plan.Id,
                OwnerUserId = plan.OwnerUserId,
                Title = plan.Title,
                Description = plan.Description,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Budget = plan.Budget,
                Notes = plan.Notes,
                CreatedAt = plan.CreatedAt,
                UpdatedAt = plan.UpdatedAt
            };
        }

        public static TravelPlanListItemDto ToListItem(TravelPlan plan)
        {
            return new TravelPlanListItemDto
            {
                Id = plan.Id,
                OwnerUserId = plan.OwnerUserId,
                Title = plan.Title,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Budget = plan.Budget
            };
        }
    }
}