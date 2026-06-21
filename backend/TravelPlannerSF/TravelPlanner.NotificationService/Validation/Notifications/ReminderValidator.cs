using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;

namespace TravelPlanner.NotificationService.Validation.Notifications
{
    public static class ReminderValidator
    {
        public static ValidationResultDto ValidateCreate(CreateReminderCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Reminder data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.UserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateReminderData(
                command.Title,
                command.Description,
                command.ReminderAt
            );
        }

        public static ValidationResultDto ValidateUpdate(UpdateReminderCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Reminder data is required.");
            }

            if (command.ReminderId == Guid.Empty)
            {
                return ValidationResultDto.Fail("Reminder id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateReminderData(
                command.Title,
                command.Description,
                command.ReminderAt
            );
        }

        public static ValidationResultDto ValidateGet(Guid reminderId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (reminderId == Guid.Empty)
            {
                return ValidationResultDto.Fail("Reminder id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateGetByTravelPlan(int travelPlanId, int requestUserId)
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

        private static ValidationResultDto ValidateReminderData(string title, string? description, DateTime reminderAt)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return ValidationResultDto.Fail("Reminder title is required.");
            }

            if (title.Trim().Length > 150)
            {
                return ValidationResultDto.Fail("Reminder title cannot exceed 150 characters.");
            }

            if (!string.IsNullOrWhiteSpace(description) &&
                description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Reminder description cannot exceed 1000 characters.");
            }

            if (reminderAt == default)
            {
                return ValidationResultDto.Fail("Reminder date is required.");
            }

            if (reminderAt <= DateTime.UtcNow)
            {
                return ValidationResultDto.Fail("Reminder date must be in the future.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateReminderAction(Guid reminderId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (reminderId == Guid.Empty)
            {
                return ValidationResultDto.Fail("Reminder id is not valid.");
            }

            return ValidationResultDto.Success();
        }
    }
}