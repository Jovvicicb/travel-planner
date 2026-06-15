using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Validation.Destinations
{
    public static class DestinationValidator
    {
        public static ValidationResultDto ValidateCreate(CreateDestinationCommandDto command, TravelPlan travelPlan)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Destination data is required.");
            }

            if (travelPlan == null)
            {
                return ValidationResultDto.Fail("Travel plan not found.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Name))
            {
                return ValidationResultDto.Fail("Destination name is required.");
            }

            if (command.Name.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Destination name cannot exceed 120 characters.");
            }

            if (string.IsNullOrWhiteSpace(command.Location))
            {
                return ValidationResultDto.Fail("Location is required.");
            }

            if (command.Location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Location cannot exceed 200 characters.");
            }

            if (command.StartDate == default)
            {
                return ValidationResultDto.Fail("Start date is required.");
            }

            if (command.EndDate == default)
            {
                return ValidationResultDto.Fail("End date is required.");
            }

            if (command.StartDate.Date > command.EndDate.Date)
            {
                return ValidationResultDto.Fail("End date cannot be before start date.");
            }

            if (command.StartDate.Date < travelPlan.StartDate.Date)
            {
                return ValidationResultDto.Fail("Destination start date cannot be before travel plan start date.");
            }

            if (command.EndDate.Date > travelPlan.EndDate.Date)
            {
                return ValidationResultDto.Fail("Destination end date cannot be after travel plan end date.");
            }

            if (!string.IsNullOrWhiteSpace(command.Notes) &&
                command.Notes.Trim().Length > 2000)
            {
                return ValidationResultDto.Fail("Notes cannot exceed 2000 characters.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUpdate(UpdateDestinationCommandDto command, TravelPlan travelPlan)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Destination data is required.");
            }

            if (command.DestinationId <= 0)
            {
                return ValidationResultDto.Fail("Destination id is not valid.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (travelPlan == null)
            {
                return ValidationResultDto.Fail("Travel plan not found.");
            }

            if (string.IsNullOrWhiteSpace(command.Name))
            {
                return ValidationResultDto.Fail("Destination name is required.");
            }

            if (command.Name.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Destination name cannot exceed 120 characters.");
            }

            if (string.IsNullOrWhiteSpace(command.Location))
            {
                return ValidationResultDto.Fail("Location is required.");
            }

            if (command.Location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Location cannot exceed 200 characters.");
            }

            if (command.StartDate == default)
            {
                return ValidationResultDto.Fail("Start date is required.");
            }

            if (command.EndDate == default)
            {
                return ValidationResultDto.Fail("End date is required.");
            }

            if (command.StartDate.Date > command.EndDate.Date)
            {
                return ValidationResultDto.Fail("End date cannot be before start date.");
            }

            if (command.StartDate.Date < travelPlan.StartDate.Date)
            {
                return ValidationResultDto.Fail("Destination start date cannot be before travel plan start date.");
            }

            if (command.EndDate.Date > travelPlan.EndDate.Date)
            {
                return ValidationResultDto.Fail("Destination end date cannot be after travel plan end date.");
            }

            if (!string.IsNullOrWhiteSpace(command.Notes) &&
                command.Notes.Trim().Length > 2000)
            {
                return ValidationResultDto.Fail("Notes cannot exceed 2000 characters.");
            }

            return ValidationResultDto.Success();
        }
    }
}