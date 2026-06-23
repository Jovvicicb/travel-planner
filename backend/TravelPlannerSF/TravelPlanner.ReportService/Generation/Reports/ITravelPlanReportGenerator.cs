using TravelPlanner.Contracts.DTOs.Reports;

namespace TravelPlanner.ReportService.Generation.Reports
{
    public interface ITravelPlanReportGenerator
    {
        byte[] Generate();
    }
}