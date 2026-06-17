namespace TravelPlanner.Contracts.DTOs.Trips.Expenses
{
    public class BudgetSummaryDto
    {
        public int TravelPlanId { get; set; }

        public decimal PlannedBudget { get; set; }

        public decimal TotalExpenses { get; set; }

        public decimal RemainingBudget { get; set; }

        public bool IsOverBudget { get; set; }
    }
}