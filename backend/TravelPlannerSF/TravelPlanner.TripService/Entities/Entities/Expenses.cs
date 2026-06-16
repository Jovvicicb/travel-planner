using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Entities.Expenses
{
    public class Expense
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Title { get; set; } = string.Empty;

        public ExpenseCategory Category { get; set; } = ExpenseCategory.Other;

        public decimal Amount { get; set; }

        public DateTime ExpenseDate { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public TravelPlan TravelPlan { get; set; } = null!;
    }
}