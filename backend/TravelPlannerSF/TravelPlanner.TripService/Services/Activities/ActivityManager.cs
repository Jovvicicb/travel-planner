using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
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

        public async Task<ServiceResultDto<List<ActivityResponseDto>>> GetActivitiesAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Travel plan id is not valid."
                );
            }

            if (destinationId <= 0)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Destination id is not valid."
                );
            }

            var destination = await destinationRepository.GetByIdAsync(destinationId);

            if (destination == null)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Destination not found.",
                    404
                );
            }

            if (destination.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Destination does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<List<ActivityResponseDto>>.Fail(
                    "You do not have permission to view activities for this destination.",
                    403
                );
            }

            var activities = await activityRepository.GetByDestinationIdAsync(destinationId);

            var response = activities
                .Select(ActivityMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<ActivityResponseDto>>.Ok(
                response,
                "Activities fetched successfully."
            );
        }

        public async Task<ServiceResultDto<List<CalendarDayDto>>> GetCalendarAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<CalendarDayDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<CalendarDayDto>>.Fail(
                    "Travel plan id is not valid."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<CalendarDayDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<List<CalendarDayDto>>.Fail(
                    "You do not have permission to view this travel plan calendar.",
                    403
                );
            }

            var activities = await activityRepository.GetByTravelPlanIdAsync(travelPlanId);

            var calendar = activities
                .GroupBy(activity => activity.ActivityDate.Date)
                .OrderBy(group => group.Key)
                .Select(group => new CalendarDayDto
                {
                    Date = group.Key,
                    Activities = group
                        .OrderBy(activity => activity.StartTime)
                        .Select(ActivityMapper.ToResponse)
                        .ToList()
                })
                .ToList();

            return ServiceResultDto<List<CalendarDayDto>>.Ok(
                calendar,
                "Activity calendar fetched successfully."
            );
        }

        public async Task<ServiceResultDto<ActivityResponseDto>> UpdateActivityAsync(UpdateActivityCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail("Activity data is required.");
            }

            var activity = await activityRepository.GetByIdAsync(command.ActivityId);

            if (activity == null)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail("Activity not found.", 404);
            }

            if (activity.DestinationId != command.DestinationId)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail(
                    "Activity does not belong to the specified destination.",
                    400
                );
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
                    "You do not have permission to update this activity.",
                    403
                );
            }

            var validation = ActivityValidator.ValidateUpdate(command, destination);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ActivityResponseDto>.Fail(validation.Message);
            }

            activity.Title = command.Title.Trim();
            activity.ActivityDate = command.ActivityDate;
            activity.StartTime = command.StartTime;
            activity.EndTime = command.EndTime;
            activity.Location = command.Location.Trim();
            activity.Description = command.Description?.Trim();
            activity.EstimatedCost = command.EstimatedCost;
            activity.Status = command.Status;
            activity.UpdatedAt = DateTime.UtcNow;

            await activityRepository.UpdateAsync(activity);

            return ServiceResultDto<ActivityResponseDto>.Ok(
                ActivityMapper.ToResponse(activity),
                "Activity updated successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteActivityAsync(int travelPlanId, int destinationId, int activityId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto.Fail("Travel plan id is not valid.");
            }

            if (destinationId <= 0)
            {
                return ServiceResultDto.Fail("Destination id is not valid.");
            }

            if (activityId <= 0)
            {
                return ServiceResultDto.Fail("Activity id is not valid.");
            }

            var activity = await activityRepository.GetByIdAsync(activityId);

            if (activity == null)
            {
                return ServiceResultDto.Fail("Activity not found.", 404);
            }

            if (activity.DestinationId != destinationId)
            {
                return ServiceResultDto.Fail(
                    "Activity does not belong to the specified destination.",
                    400
                );
            }

            var destination = await destinationRepository.GetByIdAsync(destinationId);

            if (destination == null)
            {
                return ServiceResultDto.Fail("Destination not found.", 404);
            }

            if (destination.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto.Fail(
                    "Destination does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto.Fail("Travel plan not found.", 404);
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto.Fail(
                    "You do not have permission to delete this activity.",
                    403
                );
            }

            await activityRepository.DeleteAsync(activity);

            return ServiceResultDto.Ok("Activity deleted successfully.");
        }
    }
}