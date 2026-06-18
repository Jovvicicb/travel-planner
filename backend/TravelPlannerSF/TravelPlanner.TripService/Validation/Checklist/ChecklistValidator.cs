using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;

namespace TravelPlanner.TripService.Validation.Checklist
{
    public static class ChecklistValidator
    {
        public static ValidationResultDto ValidateCreate(CreateChecklistItemCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Checklist item data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Checklist item title is required.");
            }

            if (command.Title.Trim().Length > 150)
            {
                return ValidationResultDto.Fail("Checklist item title cannot exceed 150 characters.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUpdate(UpdateChecklistItemCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Checklist item data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.ItemId <= 0)
            {
                return ValidationResultDto.Fail("Checklist item id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Checklist item title is required.");
            }

            if (command.Title.Trim().Length > 150)
            {
                return ValidationResultDto.Fail("Checklist item title cannot exceed 150 characters.");
            }

            return ValidationResultDto.Success();
        }
    }
}