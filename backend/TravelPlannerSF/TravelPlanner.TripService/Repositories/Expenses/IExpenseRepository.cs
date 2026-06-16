using TravelPlanner.TripService.Entities.Expenses;

namespace TravelPlanner.TripService.Repositories.Expenses
{
    public interface IExpenseRepository
    {
        Task<Expense> CreateAsync(Expense expense);
    }
}