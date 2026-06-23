using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Reports;

namespace TravelPlanner.ReportService.Services.Reports
{
    public interface IReportManager
    {
        Task<ServiceResultDto<TravelPlanReportDto>> GenerateTravelPlanReportAsync(GenerateTravelPlanReportCommandDto command);
    }
}