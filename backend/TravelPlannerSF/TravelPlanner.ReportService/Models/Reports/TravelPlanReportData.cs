using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.DTOs.Trips.Shares;

namespace TravelPlanner.ReportService.Models.Reports
{
    public class TravelPlanReportData
    {
        public TravelPlanResponseDto TravelPlan { get; set; } = new();

        public List<DestinationResponseDto> Destinations { get; set; } = new();

        public List<CalendarDayDto> CalendarDays { get; set; } = new();

        public List<ExpenseResponseDto> Expenses { get; set; } = new();

        public BudgetSummaryDto? BudgetSummary { get; set; }

        public List<ChecklistItemResponseDto> ChecklistItems { get; set; } = new();

        public List<ReminderResponseDto> Reminders { get; set; } = new();

        public List<TravelPlanShareResponseDto> ShareLinks { get; set; } = new();
    }
}