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
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.Category,
                command.Amount,
                command.ExpenseDate,
                command.Description
            );
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
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidateCommon(
                command.Title,
                command.Category,
                command.Amount,
                command.ExpenseDate,
                command.Description
            );
        }

        public static ValidationResultDto ValidateGet(int travelPlanId, int requestUserId)
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

        public static ValidationResultDto ValidateDelete(int travelPlanId, int expenseId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (expenseId <= 0)
            {
                return ValidationResultDto.Fail("Expense id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateBudgetSummary(int travelPlanId, int requestUserId)
        {
            return ValidateGet(travelPlanId, requestUserId);
        }

        private static ValidationResultDto ValidateCommon(
            string title,
            ExpenseCategory category,
            decimal amount,
            DateTime expenseDate,
            string? description)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return ValidationResultDto.Fail("Expense title is required.");
            }

            if (title.Trim().Length > 120)
            {
                return ValidationResultDto.Fail("Expense title cannot exceed 120 characters.");
            }

            if (!Enum.IsDefined(typeof(ExpenseCategory), category))
            {
                return ValidationResultDto.Fail("Expense category is not valid.");
            }

            if (amount <= 0)
            {
                return ValidationResultDto.Fail("Expense amount must be greater than zero.");
            }

            if (expenseDate == default)
            {
                return ValidationResultDto.Fail("Expense date is required.");
            }

            if (!string.IsNullOrWhiteSpace(description) &&
                description.Trim().Length > 1000)
            {
                return ValidationResultDto.Fail("Expense description cannot exceed 1000 characters.");
            }

            return ValidationResultDto.Success();
        }
    }
}