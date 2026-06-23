using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Reports;
using TravelPlanner.Contracts.Interfaces.Reports;
using TravelPlanner.ReportService.Generation.Reports;
using TravelPlanner.ReportService.Services.Reports;

namespace TravelPlanner.ReportService
{
    internal sealed class ReportService : StatelessService, IReportService
    {
        private readonly IServiceProvider serviceProvider;

        public ReportService(StatelessServiceContext context)
            : base(context)
        {
            var services = new ServiceCollection();

            services.AddScoped<ITravelPlanReportGenerator, TravelPlanReportGenerator>();
            services.AddScoped<IReportManager, ReportManager>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        public async Task<ServiceResultDto<TravelPlanReportDto>> GenerateTravelPlanReportAsync(GenerateTravelPlanReportCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IReportManager>();

            return await manager.GenerateTravelPlanReportAsync(command);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}