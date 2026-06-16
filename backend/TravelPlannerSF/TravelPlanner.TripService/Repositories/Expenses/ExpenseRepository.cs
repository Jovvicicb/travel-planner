using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Entities.Expenses;

namespace TravelPlanner.TripService.Repositories.Expenses
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly TripDbContext context;

        public ExpenseRepository(TripDbContext context)
        {
            this.context = context;
        }

        public async Task<Expense> CreateAsync(Expense expense)
        {
            context.Expenses.Add(expense);

            await context.SaveChangesAsync();

            return expense;
        }
    }
}