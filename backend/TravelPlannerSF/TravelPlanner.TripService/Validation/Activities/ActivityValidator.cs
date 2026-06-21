using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Validation.Activities
{
    public static class ActivityValidator
    {
        public static ValidationResultDto ValidateCreate(CreateActivityCommandDto command, Destination destination)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Activity data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.DestinationId <= 0)
            {
                return ValidationResultDto.Fail("Destination id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.ActivityDate,
                command.StartTime,
                command.EndTime,
                command.Location,
                command.Description,
                command.EstimatedCost,
                command.Status,
                destination
            );
        }

        public static ValidationResultDto ValidateUpdate(UpdateActivityCommandDto command, Destination destination)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Activity data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.DestinationId <= 0)
            {
                return ValidationResultDto.Fail("Destination id is not valid.");
            }

            if (command.ActivityId <= 0)
            {
                return ValidationResultDto.Fail("Activity id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.ActivityDate,
                command.StartTime,
                command.EndTime,
                command.Location,
                command.Description,
                command.EstimatedCost,
                command.Status,
                destination
            );
        }

        public static ValidationResultDto ValidateGet(int travelPlanId, int destinationId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (destinationId <= 0)
            {
                return ValidationResultDto.Fail("Destination id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateCalendar(int travelPlanId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateDelete(int travelPlanId, int destinationId, int activityId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (destinationId <= 0)
            {
                return ValidationResultDto.Fail("Destination id is not valid.");
            }

            if (activityId <= 0)
            {
                return ValidationResultDto.Fail("Activity id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        private static ValidationResultDto ValidateCommon(
            string title,
            DateTime activityDate,
            TimeSpan startTime,
            TimeSpan endTime,
            string location,
            string? description,
            decimal estimatedCost,
            ActivityStatus status,
            Destination destination)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return ValidationResultDto.Fail("Activity title is required.");
            }

            if (title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Activity title cannot exceed 120 characters.");
            }

            if (activityDate == default)
            {
                return ValidationResultDto.Fail("Activity date is required.");
            }

            if (activityDate.Date < destination.StartDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be before destination start date.");
            }

            if (activityDate.Date > destination.EndDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be after destination end date.");
            }

            if (startTime == default)
            {
                return ValidationResultDto.Fail("Start time is required.");
            }

            if (endTime == default)
            {
                return ValidationResultDto.Fail("End time is required.");
            }

            if (startTime >= endTime)
            {
                return ValidationResultDto.Fail("End time must be after start time.");
            }

            if (string.IsNullOrWhiteSpace(location))
            {
                return ValidationResultDto.Fail("Activity location is required.");
            }

            if (location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Activity location cannot exceed 200 characters.");
            }

            if (!string.IsNullOrWhiteSpace(description) &&
                description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Activity description cannot exceed 1000 characters.");
            }

            if (estimatedCost < 0)
            {
                return ValidationResultDto.Fail("Estimated cost cannot be negative.");
            }

            if (!Enum.IsDefined(typeof(ActivityStatus), status))
            {
                return ValidationResultDto.Fail("Activity status is not valid.");
            }

            return ValidationResultDto.Success();
        }
    }
}