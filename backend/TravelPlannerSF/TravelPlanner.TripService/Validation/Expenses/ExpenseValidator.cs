using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.TripService.Validation.Expenses
{
    public static class ExpenseValidator
    {
        public static ValidationResultDto ValidateCreate(CreateExpenseCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Expense data is required.");
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
                return ValidationResultDto.Fail("Expense title is required.");
            }

            if (command.Title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Expense title cannot exceed 120 characters.");
            }

            if (!Enum.IsDefined(typeof(ExpenseCategory), command.Category))
            {
                return ValidationResultDto.Fail("Expense category is not valid.");
            }

            if (command.Amount <= 0)
            {
                return ValidationResultDto.Fail("Expense amount must be greater than zero.");
            }

            if (command.ExpenseDate == default)
            {
                return ValidationResultDto.Fail("Expense date is required.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Expense description cannot exceed 1000 characters.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateUpdate(UpdateExpenseCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Expense data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.ExpenseId <= 0)
            {
                return ValidationResultDto.Fail("Expense id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (string.IsNullOrWhiteSpace(command.Title))
            {
                return ValidationResultDto.Fail("Expense title is required.");
            }

            if (command.Title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Expense title cannot exceed 120 characters.");
            }

            if (!Enum.IsDefined(typeof(ExpenseCategory), command.Category))
            {
                return ValidationResultDto.Fail("Expense category is not valid.");
            }

            if (command.Amount <= 0)
            {
                return ValidationResultDto.Fail("Expense amount must be greater than zero.");
            }

            if (command.ExpenseDate == default)
            {
                return ValidationResultDto.Fail("Expense date is required.");
            }

            if (!string.IsNullOrWhiteSpace(command.Description) &&
                command.Description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Expense description cannot exceed 1000 characters.");
            }

            return ValidationResultDto.Success();
        }
    }
}