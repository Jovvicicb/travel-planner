using TravelPlanner.ReportService.Models.Reports;

namespace TravelPlanner.ReportService.Generation.Reports
{
    public interface ITravelPlanReportGenerator
    {
        byte[] Generate(TravelPlanReportData reportData);
    }
}