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

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Name,
                command.Location,
                command.StartDate,
                command.EndDate,
                command.Notes,
                travelPlan
            );
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
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Name,
                command.Location,
                command.StartDate,
                command.EndDate,
                command.Notes,
                travelPlan
            );
        }

        public static ValidationResultDto ValidateGetAll(int travelPlanId, int requestUserId)
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

        public static ValidationResultDto ValidateDelete(int travelPlanId, int destinationId, int requestUserId)
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

        private static ValidationResultDto ValidateCommon(
            string name,
            string location,
            DateTime startDate,
            DateTime endDate,
            string? notes,
            TravelPlan travelPlan)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return ValidationResultDto.Fail("Destination name is required.");
            }

            if (name.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Destination name cannot exceed 120 characters.");
            }

            if (string.IsNullOrWhiteSpace(location))
            {
                return ValidationResultDto.Fail("Location is required.");
            }

            if (location.Trim().Length > 200)
            {
                return ValidationResultDto.Fail("Location cannot exceed 200 characters.");
            }

            if (startDate == default)
            {
                return ValidationResultDto.Fail("Start date is required.");
            }

            if (endDate == default)
            {
                return ValidationResultDto.Fail("End date is required.");
            }

            if (startDate.Date > endDate.Date)
            {
                return ValidationResultDto.Fail("End date cannot be before start date.");
            }

            if (startDate.Date < travelPlan.StartDate.Date)
            {
                return ValidationResultDto.Fail("Destination start date cannot be before travel plan start date.");
            }

            if (endDate.Date > travelPlan.EndDate.Date)
            {
                return ValidationResultDto.Fail("Destination end date cannot be after travel plan end date.");
            }

            if (!string.IsNullOrWhiteSpace(notes) &&
                notes.Trim().Length > 2000)
            {
                return ValidationResultDto.Fail("Notes cannot exceed 2000 characters.");
            }

            return ValidationResultDto.Success();
        }
    }
}