using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.TripService.Entities.Expenses;
using TravelPlanner.TripService.Mapping.Expenses;
using TravelPlanner.TripService.Repositories.Activities;
using TravelPlanner.TripService.Repositories.Expenses;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.Permissions;
using TravelPlanner.TripService.Validation.Expenses;

namespace TravelPlanner.TripService.Services.Expenses
{
    public class ExpenseManager : IExpenseManager
    {
        private readonly IExpenseRepository expenseRepository;
        private readonly ITravelPlanRepository travelPlanRepository;
        private readonly IActivityRepository activityRepository;
        private readonly ITravelPlanPermissionService permissionService;


        public ExpenseManager(
            IExpenseRepository expenseRepository,
            ITravelPlanRepository travelPlanRepository,
            IActivityRepository activityRepository,
            ITravelPlanPermissionService permissionService)
        {
            this.expenseRepository = expenseRepository;
            this.travelPlanRepository = travelPlanRepository;
            this.activityRepository = activityRepository;
            this.permissionService = permissionService;
        }

        public async Task<ServiceResultDto<ExpenseResponseDto>> CreateExpenseAsync(CreateExpenseCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail("Expense data is required.");
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    "You do not have permission to add expenses to this travel plan.",
                    403
                );
            }

            var validation = ExpenseValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var expense = new Expense
            {
                TravelPlanId = command.TravelPlanId,
                Title = command.Title.Trim(),
                Category = command.Category,
                Amount = command.Amount,
                ExpenseDate = command.ExpenseDate,
                Description = command.Description?.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var createdExpense = await expenseRepository.CreateAsync(expense);

            return ServiceResultDto<ExpenseResponseDto>.Created(
                ExpenseMapper.ToResponse(createdExpense),
                "Expense created successfully."
            );
        }

        public async Task<ServiceResultDto<List<ExpenseResponseDto>>> GetExpensesAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            var validation = ExpenseValidator.ValidateGet(travelPlanId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<List<ExpenseResponseDto>>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<ExpenseResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canView = await permissionService.CanViewAsync(travelPlan, requestUserId, isAdmin);

            if (!canView)
            {
                return ServiceResultDto<List<ExpenseResponseDto>>.Fail(
                    "You do not have permission to view expenses for this travel plan.",
                    403
                );
            }

            var expenses = await expenseRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = expenses
                .Select(ExpenseMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<ExpenseResponseDto>>.Ok(
                response,
                "Expenses fetched successfully."
            );
        }

        public async Task<ServiceResultDto<ExpenseResponseDto>> UpdateExpenseAsync(UpdateExpenseCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail("Expense data is required.");
            }

            var expense = await expenseRepository.GetByIdAsync(command.ExpenseId);

            if (expense == null)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail("Expense not found.", 404);
            }

            if (expense.TravelPlanId != command.TravelPlanId)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    "Expense does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail("Travel plan not found.", 404);
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    "You do not have permission to update this expense.",
                    403
                );
            }

            var validation = ExpenseValidator.ValidateUpdate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            expense.Title = command.Title.Trim();
            expense.Category = command.Category;
            expense.Amount = command.Amount;
            expense.ExpenseDate = command.ExpenseDate;
            expense.Description = command.Description?.Trim();
            expense.UpdatedAt = DateTime.UtcNow;

            await expenseRepository.UpdateAsync(expense);

            return ServiceResultDto<ExpenseResponseDto>.Ok(
                ExpenseMapper.ToResponse(expense),
                "Expense updated successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteExpenseAsync(int travelPlanId, int expenseId, int requestUserId, bool isAdmin)
        {
            var validation = ExpenseValidator.ValidateDelete(travelPlanId, expenseId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var expense = await expenseRepository.GetByIdAsync(expenseId);

            if (expense == null)
            {
                return ServiceResultDto.Fail("Expense not found.", 404);
            }

            if (expense.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto.Fail(
                    "Expense does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto.Fail("Travel plan not found.", 404);
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, requestUserId, isAdmin);

            if (!canEdit)
            {
                return ServiceResultDto.Fail(
                    "You do not have permission to delete this expense.",
                    403
                );
            }

            await expenseRepository.DeleteAsync(expense);

            return ServiceResultDto.Ok("Expense deleted successfully.");
        }

        public async Task<ServiceResultDto<BudgetSummaryDto>> GetBudgetSummaryAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            var validation = ExpenseValidator.ValidateBudgetSummary(travelPlanId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<BudgetSummaryDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<BudgetSummaryDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canView = await permissionService.CanViewAsync(travelPlan, requestUserId, isAdmin);

            if (!canView)
            {
                return ServiceResultDto<BudgetSummaryDto>.Fail(
                    "You do not have permission to view budget summary for this travel plan.",
                    403
                );
            }
            // Budget summary combines manually recorded expenses and estimated activity costs.
            var totalRecordedExpenses = await expenseRepository.GetTotalAmountByTravelPlanIdAsync(travelPlanId);
            var totalActivityEstimatedCosts = await activityRepository.GetTotalEstimatedCostByTravelPlanIdAsync(travelPlanId);
            var totalExpenses = totalRecordedExpenses + totalActivityEstimatedCosts;

            var summary = new BudgetSummaryDto
            {
                TravelPlanId = travelPlan.Id,
                PlannedBudget = travelPlan.Budget,
                TotalExpenses = totalExpenses,
                RemainingBudget = travelPlan.Budget - totalExpenses,
                IsOverBudget = totalExpenses > travelPlan.Budget
            };

            return ServiceResultDto<BudgetSummaryDto>.Ok(
                summary,
                "Budget summary fetched successfully."
            );
        }
    }
}