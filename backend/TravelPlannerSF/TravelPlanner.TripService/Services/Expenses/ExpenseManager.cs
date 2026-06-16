using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.TripService.Entities.Expenses;
using TravelPlanner.TripService.Mapping.Expenses;
using TravelPlanner.TripService.Repositories.Expenses;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.Expenses;

namespace TravelPlanner.TripService.Services.Expenses
{
    public class ExpenseManager : IExpenseManager
    {
        private readonly IExpenseRepository expenseRepository;
        private readonly ITravelPlanRepository travelPlanRepository;

        public ExpenseManager(
            IExpenseRepository expenseRepository,
            ITravelPlanRepository travelPlanRepository)
        {
            this.expenseRepository = expenseRepository;
            this.travelPlanRepository = travelPlanRepository;
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

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(
                    "You do not have permission to add expenses to this travel plan.",
                    403
                );
            }

            var validation = ExpenseValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ExpenseResponseDto>.Fail(validation.Message);
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
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<ExpenseResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<ExpenseResponseDto>>.Fail(
                    "Travel plan id is not valid."
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

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
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
    }
}