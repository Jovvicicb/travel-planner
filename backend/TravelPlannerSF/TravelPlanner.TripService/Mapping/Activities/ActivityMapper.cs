using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.TripService.Entities.Activities;

namespace TravelPlanner.TripService.Mapping.Activities
{
    public static class ActivityMapper
    {
        public static ActivityResponseDto ToResponse(Activity activity)
        {
            return new ActivityResponseDto
            {
                Id = activity.Id,
                DestinationId = activity.DestinationId,
                Title = activity.Title,
                ActivityDate = activity.ActivityDate,
                StartTime = activity.StartTime,
                EndTime = activity.EndTime,
                Location = activity.Location,
                Description = activity.Description,
                EstimatedCost = activity.EstimatedCost,
                Status = activity.Status,
                CreatedAt = activity.CreatedAt,
                UpdatedAt = activity.UpdatedAt
            };
        }
    }
}