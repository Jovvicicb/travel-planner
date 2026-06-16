using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Expense>> GetByTravelPlanIdAsync(int travelPlanId)
        {
            return await context.Expenses
                .Where(expense => expense.TravelPlanId == travelPlanId)
                .OrderByDescending(expense => expense.ExpenseDate)
                .ThenByDescending(expense => expense.CreatedAt)
                .ToListAsync();
        }

        public async Task<Expense?> GetByIdAsync(int expenseId)
        {
            return await context.Expenses
                .FirstOrDefaultAsync(expense => expense.Id == expenseId);
        }

        public async Task UpdateAsync(Expense expense)
        {
            context.Expenses.Update(expense);

            await context.SaveChangesAsync();
        }
    }
}