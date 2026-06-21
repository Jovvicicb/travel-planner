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

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Reminder title is required.");
            }

            if (command.Title.Trim().Length > 150)
            {
                return ValidationResultDto.Fail("Reminder title cannot exceed 150 characters.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Reminder description cannot exceed 1000 characters.");
            }

            if (command.ReminderAt == default)
            {
                return ValidationResultDto.Fail("Reminder date is required.");
            }

            if (command.ReminderAt <= DateTime.UtcNow)
            {
                return ValidationResultDto.Fail("Reminder date must be in the future.");
            }

            return ValidationResultDto.Success();
        }
    }
}