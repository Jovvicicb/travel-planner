using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Expenses
{
    public class CreateExpenseCommandDto
    {
        public int TravelPlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public ExpenseCategory Category { get; set; } = ExpenseCategory.Other;

        public decimal Amount { get; set; }

        public DateTime ExpenseDate { get; set; }

        public string? Description { get; set; }
    }
}