using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.Interfaces.Trips;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.TravelPlans;

namespace TravelPlanner.TripService
{
    internal sealed class TripService : StatelessService, ITripService
    {
        private readonly IServiceProvider serviceProvider;

        public TripService(StatelessServiceContext context): base(context)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(context.CodePackageActivationContext.GetCodePackageObject("Code").Path)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
                .Build();

            var services = new ServiceCollection();

            services.AddDbContext<TripDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("TripDb"));
            });

            services.AddScoped<ITravelPlanRepository, TravelPlanRepository>();
            services.AddScoped<ITravelPlanManager, TravelPlanManager>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        public async Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<ITravelPlanManager>();

            return await manager.CreateTravelPlanAsync(command);
        }

        public async Task<ServiceResultDto<List<TravelPlanListItemDto>>> GetTravelPlansAsync(int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<ITravelPlanManager>();

            return await manager.GetTravelPlansAsync(requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<TravelPlanResponseDto>> GetTravelPlanByIdAsync(int planId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<ITravelPlanManager>();

            return await manager.GetTravelPlanByIdAsync(planId, requestUserId, isAdmin);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}