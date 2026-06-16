using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;

namespace TravelPlanner.TripService.Services.Expenses
{
    public interface IExpenseManager
    {
        Task<ServiceResultDto<ExpenseResponseDto>> CreateExpenseAsync(CreateExpenseCommandDto command);

        Task<ServiceResultDto<List<ExpenseResponseDto>>> GetExpensesAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ExpenseResponseDto>> UpdateExpenseAsync(UpdateExpenseCommandDto command);

        Task<ServiceResultDto> DeleteExpenseAsync(int travelPlanId, int expenseId, int requestUserId, bool isAdmin);
    }
}