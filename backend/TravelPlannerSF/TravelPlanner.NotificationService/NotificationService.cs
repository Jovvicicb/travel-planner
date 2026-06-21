using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.Contracts.Interfaces.Notifications;
using TravelPlanner.NotificationService.Data;
using TravelPlanner.NotificationService.Repositories.Notifications;
using TravelPlanner.NotificationService.Services.Notifications;

namespace TravelPlanner.NotificationService
{
    internal sealed class NotificationService : StatefulService, INotificationService
    {
        private readonly IServiceProvider serviceProvider;

        public NotificationService(StatefulServiceContext context)
            : base(context)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(context.CodePackageActivationContext.GetCodePackageObject("Code").Path)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
                .Build();

            // Configure dependencies used inside remoting request scopes.
            var services = new ServiceCollection();

            services.AddDbContext<NotificationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("NotificationDb"));
            });

            services.AddScoped<IReminderRepository, ReminderRepository>();
            services.AddScoped<INotificationManager, NotificationManager>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> CreateReminderAsync(CreateReminderCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.CreateReminderAsync(command);
        }

        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return this.CreateServiceRemotingReplicaListeners();
        }
    }
}