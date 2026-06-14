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
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Title is required.");
            }

            if (command.Title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Title cannot exceed 120 characters.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Description cannot exceed 1000 characters.");
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

            if (command.Budget < 0)
            {
                return ValidationResultDto.Fail("Budget cannot be negative.");
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