using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.TripService.Entities.Activities;
using TravelPlanner.TripService.Mapping.Activities;
using TravelPlanner.TripService.Repositories.Activities;
using TravelPlanner.TripService.Repositories.Destinations;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.Activities;

namespace TravelPlanner.TripService.Services.Activities
{
    public class ActivityManager : IActivityManager
    {
        private readonly IActivityRepository activityRepository;
        private readonly IDestinationRepository destinationRepository;
        private readonly ITravelPlanRepository travelPlanRepository;

        public ActivityManager(
            IActivityRepository activityRepository,
            IDestinationRepository destinationRepository,
            ITravelPlanRepository travelPlanRepository)
        {
            this.activityRepository = activityRepository;
            this.destinationRepository = destinationRepository;
            this.travelPlanRepository = travelPlanRepository;
        }

        public async Task<ServiceResultDto<ActivityResponseDto>> CreateActivityAsync(CreateActivityCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail("Activity data is required.");
            }

            var destination = await destinationRepository.GetByIdAsync(command.DestinationId);

            if (destination == null)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail("Destination not found.", 404);
            }

            if (destination.TravelPlanId != command.TravelPlanId)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail(
                    "Destination does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail("Travel plan not found.", 404);
            }

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail(
                    "You do not have permission to add activities to this destination.",
                    403
                );
            }

            var validation = ActivityValidator.ValidateCreate(command, destination);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail(validation.Message);
            }

            var activity = new Activity
            {
                DestinationId = command.DestinationId,
                Title = command.Title.Trim(),
                ActivityDate = command.ActivityDate,
                StartTime = command.StartTime,
                EndTime = command.EndTime,
                Location = command.Location.Trim(),
                Description = command.Description?.Trim(),
                EstimatedCost = command.EstimatedCost,
                Status = command.Status,
                CreatedAt = DateTime.UtcNow
            };

            var createdActivity = await activityRepository.CreateAsync(activity);

            return ServiceResultDto<ActivityResponseDto>.Created(
                ActivityMapper.ToResponse(createdActivity),
                "Activity created successfully."
            );
        }
    }
}