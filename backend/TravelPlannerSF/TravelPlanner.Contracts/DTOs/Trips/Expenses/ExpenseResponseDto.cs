using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Expenses
{
    public class ExpenseResponseDto
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Title { get; set; } = string.Empty;

        public ExpenseCategory Category { get; set; }

        public decimal Amount { get; set; }

        public DateTime ExpenseDate { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}