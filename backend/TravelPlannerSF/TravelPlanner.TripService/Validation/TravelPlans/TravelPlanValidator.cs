using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;

namespace TravelPlanner.TripService.Validation.TravelPlans
{
    public static class TravelPlanValidator
    {
        public static ValidationResultDto ValidateCreate(CreateTravelPlanCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Travel plan data is required.");
            }

            if (command.OwnerUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.Description,
                command.StartDate,
                command.EndDate,
                command.Budget,
                command.Notes
            );
        }

        public static ValidationResultDto ValidateUpdate(UpdateTravelPlanCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Travel plan data is required.");
            }

            if (command.PlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.Description,
                command.StartDate,
                command.EndDate,
                command.Budget,
                command.Notes
            );
        }

        public static ValidationResultDto ValidateGetAll(int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateGetById(int planId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (planId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateDelete(int planId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (planId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateDeleteByOwner(int ownerUserId)
        {
            if (ownerUserId <= 0)
            {
                return ValidationResultDto.Fail("Owner user id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        private static ValidationResultDto ValidateCommon(
            string title,
            string? description,
            DateTime startDate,
            DateTime endDate,
            decimal budget,
            string? notes)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return ValidationResultDto.Fail("Title is required.");
            }

            if (title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Title cannot exceed 120 characters.");
            }

            if (!string.IsNullOrWhiteSpace(description) &&
                description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Description cannot exceed 1000 characters.");
            }

            if (startDate == default)
            {
                return ValidationResultDto.Fail("Start date is required.");
            }

            if (endDate == default)
            {
                return ValidationResultDto.Fail("End date is required.");
            }

            if (startDate.Date < DateTime.UtcNow.Date)
            {
                return ValidationResultDto.Fail("Start date cannot be in the past.");
            }

            if (startDate.Date > endDate.Date)
            {
                return ValidationResultDto.Fail("End date cannot be before start date.");
            }

            if (budget < 0)
            {
                return ValidationResultDto.Fail("Budget cannot be negative.");
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