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
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Activity title is required.");
            }

            if (command.Title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Activity title cannot exceed 120 characters.");
            }

            if (command.ActivityDate == default)
            {
                return ValidationResultDto.Fail("Activity date is required.");
            }

            if (command.ActivityDate.Date < destination.StartDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be before destination start date.");
            }

            if (command.ActivityDate.Date > destination.EndDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be after destination end date.");
            }

            if (command.StartTime == default)
            {
                return ValidationResultDto.Fail("Start time is required.");
            }

            if (command.EndTime == default)
            {
                return ValidationResultDto.Fail("End time is required.");
            }

            if (command.StartTime >= command.EndTime)
            {
                return ValidationResultDto.Fail("End time must be after start time.");
            }

            if (string.IsNullOrWhiteSpace(command.Location))
            {
                return ValidationResultDto.Fail("Activity location is required.");
            }

            if (command.Location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Activity location cannot exceed 200 characters.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Activity description cannot exceed 1000 characters.");
            }

            if (command.EstimatedCost < 0)
            {
                return ValidationResultDto.Fail("Estimated cost cannot be negative.");
            }

            if (!Enum.IsDefined(typeof(ActivityStatus), command.Status))
            {
                return ValidationResultDto.Fail("Activity status is not valid.");
            }

            return ValidationResultDto.Success();
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
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Activity title is required.");
            }

            if (command.Title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Activity title cannot exceed 120 characters.");
            }

            if (command.ActivityDate == default)
            {
                return ValidationResultDto.Fail("Activity date is required.");
            }

            if (command.ActivityDate.Date < destination.StartDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be before destination start date.");
            }

            if (command.ActivityDate.Date > destination.EndDate.Date)
            {
                return ValidationResultDto.Fail("Activity date cannot be after destination end date.");
            }

            if (command.StartTime == default)
            {
                return ValidationResultDto.Fail("Start time is required.");
            }

            if (command.EndTime == default)
            {
                return ValidationResultDto.Fail("End time is required.");
            }

            if (command.StartTime >= command.EndTime)
            {
                return ValidationResultDto.Fail("End time must be after start time.");
            }

            if (string.IsNullOrWhiteSpace(command.Location))
            {
                return ValidationResultDto.Fail("Activity location is required.");
            }

            if (command.Location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Activity location cannot exceed 200 characters.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Activity description cannot exceed 1000 characters.");
            }

            if (command.EstimatedCost < 0)
            {
                return ValidationResultDto.Fail("Estimated cost cannot be negative.");
            }

            if (!Enum.IsDefined(typeof(ActivityStatus), command.Status))
            {
                return ValidationResultDto.Fail("Activity status is not valid.");
            }

            return ValidationResultDto.Success();
        }
    }
}