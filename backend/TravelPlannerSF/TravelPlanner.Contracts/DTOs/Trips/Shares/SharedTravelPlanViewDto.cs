using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class SharedTravelPlanViewDto
    {
        public ShareAccessLevel AccessLevel { get; set; }

        public TravelPlanResponseDto TravelPlan { get; set; } = null!;

        public List<DestinationResponseDto> Destinations { get; set; } = [];

        public List<CalendarDayDto> ActivityCalendar { get; set; } = [];

        public List<ExpenseResponseDto> Expenses { get; set; } = [];

        public BudgetSummaryDto BudgetSummary { get; set; } = null!;

        public List<ChecklistItemResponseDto> ChecklistItems { get; set; } = [];
    }
}