using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Expenses
{
    public class UpdateExpenseRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public ExpenseCategory Category { get; set; }

        public decimal Amount { get; set; }

        public DateTime ExpenseDate { get; set; }

        public string? Description { get; set; }
    }
}