using Microsoft.ServiceFabric.Services.Remoting;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Reports;

namespace TravelPlanner.Contracts.Interfaces.Reports
{
    // Service Fabric Remoting contract for report generation operations.
    public interface IReportService : IService
    {
        Task<ServiceResultDto<TravelPlanReportDto>> GenerateTravelPlanReportAsync(GenerateTravelPlanReportCommandDto command);
    }
}