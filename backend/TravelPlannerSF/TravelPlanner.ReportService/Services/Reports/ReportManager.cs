using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Reports;
using TravelPlanner.ReportService.Generation.Reports;

namespace TravelPlanner.ReportService.Services.Reports
{
    public class ReportManager : IReportManager
    {
        private readonly ITravelPlanReportGenerator reportGenerator;

        public ReportManager(ITravelPlanReportGenerator reportGenerator)
        {
            this.reportGenerator = reportGenerator;
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

            var content = reportGenerator.Generate();

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