using TravelPlanner.TripService.Entities.Expenses;

namespace TravelPlanner.TripService.Repositories.Expenses
{
    public interface IExpenseRepository
    {
        Task<Expense> CreateAsync(Expense expense);

        Task<List<Expense>> GetByTravelPlanIdAsync(int travelPlanId);

        Task<Expense?> GetByIdAsync(int expenseId);

        Task UpdateAsync(Expense expense);

        Task DeleteAsync(Expense expense);

        Task<decimal> GetTotalAmountByTravelPlanIdAsync(int travelPlanId);
    }
}