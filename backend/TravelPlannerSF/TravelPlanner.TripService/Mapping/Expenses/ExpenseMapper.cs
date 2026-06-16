using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.TripService.Entities.Expenses;

namespace TravelPlanner.TripService.Mapping.Expenses
{
    public static class ExpenseMapper
    {
        public static ExpenseResponseDto ToResponse(Expense expense)
        {
            return new ExpenseResponseDto
            {
                Id = expense.Id,
                TravelPlanId = expense.TravelPlanId,
                Title = expense.Title,
                Category = expense.Category,
                Amount = expense.Amount,
                ExpenseDate = expense.ExpenseDate,
                Description = expense.Description,
                CreatedAt = expense.CreatedAt,
                UpdatedAt = expense.UpdatedAt
            };
        }
    }
}