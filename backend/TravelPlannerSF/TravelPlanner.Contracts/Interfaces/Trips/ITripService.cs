using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;

namespace TravelPlanner.Contracts.Interfaces.Trips
{
    public interface ITripService : IService
    {
        //TravelPlan
        Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command);

        Task<ServiceResultDto<List<TravelPlanListItemDto>>> GetTravelPlansAsync(int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> GetTravelPlanByIdAsync(int planId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<TravelPlanResponseDto>> UpdateTravelPlanAsync(UpdateTravelPlanCommandDto command);

        Task<ServiceResultDto> DeleteTravelPlanAsync(int planId, int requestUserId, bool isAdmin);


        //Destination
        Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command);

        Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<DestinationResponseDto>> UpdateDestinationAsync(UpdateDestinationCommandDto command);

        Task<ServiceResultDto> DeleteDestinationAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin);


        //Activity
        Task<ServiceResultDto<ActivityResponseDto>> CreateActivityAsync(CreateActivityCommandDto command);

        Task<ServiceResultDto<List<ActivityResponseDto>>> GetActivitiesAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<List<CalendarDayDto>>> GetActivityCalendarAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ActivityResponseDto>> UpdateActivityAsync(UpdateActivityCommandDto command);

        Task<ServiceResultDto> DeleteActivityAsync(int travelPlanId, int destinationId, int activityId, int requestUserId, bool isAdmin);


        //Expense
        Task<ServiceResultDto<ExpenseResponseDto>> CreateExpenseAsync(CreateExpenseCommandDto command);

        Task<ServiceResultDto<List<ExpenseResponseDto>>> GetExpensesAsync(int travelPlanId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<ExpenseResponseDto>> UpdateExpenseAsync(UpdateExpenseCommandDto command);

        Task<ServiceResultDto> DeleteExpenseAsync(int travelPlanId, int expenseId, int requestUserId, bool isAdmin);

        Task<ServiceResultDto<BudgetSummaryDto>> GetBudgetSummaryAsync(int travelPlanId, int requestUserId, bool isAdmin);


        //ChecklistIt
        Task<ServiceResultDto<ChecklistItemResponseDto>> CreateChecklistItemAsync(CreateChecklistItemCommandDto command);
    }
}