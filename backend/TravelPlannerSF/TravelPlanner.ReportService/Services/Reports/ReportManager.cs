using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Reports;
using TravelPlanner.Contracts.Interfaces.Notifications;
using TravelPlanner.Contracts.Interfaces.Trips;
using TravelPlanner.ReportService.Generation.Reports;
using TravelPlanner.ReportService.Models.Reports;

namespace TravelPlanner.ReportService.Services.Reports
{
    public class ReportManager : IReportManager
    {
        private readonly ITravelPlanReportGenerator reportGenerator;

        private readonly ITripService tripService;

        private readonly INotificationService notificationService;

        public ReportManager(ITravelPlanReportGenerator reportGenerator)
        {
            this.reportGenerator = reportGenerator;

            this.tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );

            this.notificationService = ServiceProxy.Create<INotificationService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.NotificationService"),
                new ServicePartitionKey(0)
            );
        }

        public async Task<ServiceResultDto<TravelPlanReportDto>> GenerateTravelPlanReportAsync(GenerateTravelPlanReportCommandDto command)
        {
            await Task.CompletedTask;

            if (command == null)
            {
                return ServiceResultDto<TravelPlanReportDto>.Fail("Report request is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ServiceResultDto<TravelPlanReportDto>.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ServiceResultDto<TravelPlanReportDto>.Fail("Authenticated user is required.", 401);
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            if (!travelPlanResult.Success || travelPlanResult.Data == null)
            {
                return ServiceResultDto<TravelPlanReportDto>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }


            var destinationsResult = await tripService.GetDestinationsAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var calendarResult = await tripService.GetActivityCalendarAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var expensesResult = await tripService.GetExpensesAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var budgetSummaryResult = await tripService.GetBudgetSummaryAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var checklistResult = await tripService.GetChecklistItemsAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var activeRemindersResult = await notificationService.GetActiveRemindersByTravelPlanAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var triggeredRemindersResult = await notificationService.GetTriggeredRemindersAsync(
                command.RequestUserId,
                command.IsAdmin
            );

            var completedRemindersResult = await notificationService.GetCompletedRemindersByTravelPlanAsync(
                command.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            var reportData = new TravelPlanReportData
            {
                TravelPlan = travelPlanResult.Data,
                Destinations = destinationsResult.Data ?? new(),
                CalendarDays = calendarResult.Data ?? new(),
                Expenses = expensesResult.Data ?? new(),
                BudgetSummary = budgetSummaryResult.Data,
                ChecklistItems = checklistResult.Data ?? new(),
                ActiveReminders = activeRemindersResult.Data ?? new(),
                TriggeredReminders = triggeredRemindersResult.Data?
                .Where(reminder => reminder.TravelPlanId == command.TravelPlanId)
                .ToList() ?? new(),
                CompletedReminders = completedRemindersResult.Data ?? new()
            };

            var content = reportGenerator.Generate(reportData);

            var response = new TravelPlanReportDto
            {
                FileName = $"travel-plan-{command.TravelPlanId}-report.pdf",
                Content = content
            };

            return ServiceResultDto<TravelPlanReportDto>.Ok(
                response,
                "Travel plan report generated successfully."
            );
        }
    }
}