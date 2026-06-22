using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Data;
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
using TravelPlanner.NotificationService.Services.Processing;
using TravelPlanner.NotificationService.Services.Recovery;
using TravelPlanner.NotificationService.Services.State;

namespace TravelPlanner.NotificationService
{
    internal sealed class NotificationService : StatefulService, INotificationService
    {
        private readonly IServiceProvider serviceProvider;
        private bool stateRecovered;

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
            services.AddSingleton<IReliableStateManager>(this.StateManager);
            services.AddScoped<IReminderStateStore, ReminderStateStore>();
            services.AddScoped<INotificationManager, NotificationManager>();
            services.AddScoped<IReminderProcessor, ReminderProcessor>();
            services.AddScoped<IReminderStateRecoveryService, ReminderStateRecoveryService>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> CreateReminderAsync(CreateReminderCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.CreateReminderAsync(command);
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> GetReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.GetReminderAsync(reminderId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.GetRemindersByTravelPlanAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetActiveRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.GetActiveRemindersByTravelPlanAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetTriggeredRemindersAsync(int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.GetTriggeredRemindersAsync(requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetCompletedRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.GetCompletedRemindersByTravelPlanAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> UpdateReminderAsync(UpdateReminderCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.UpdateReminderAsync(command);
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> CompleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.CompleteReminderAsync(reminderId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto> DeleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<INotificationManager>();

            return await manager.DeleteReminderAsync(reminderId, requestUserId, isAdmin);
        }

        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return this.CreateServiceRemotingReplicaListeners();
        }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            if (!stateRecovered)
            {
                using var recoveryScope = serviceProvider.CreateScope();

                var recoveryService = recoveryScope.ServiceProvider.GetRequiredService<IReminderStateRecoveryService>();

                await recoveryService.RecoverAsync();

                stateRecovered = true;
            }

            while (!cancellationToken.IsCancellationRequested)
            {
                using var scope = serviceProvider.CreateScope();

                var reminderProcessor = scope.ServiceProvider.GetRequiredService<IReminderProcessor>();

                await reminderProcessor.ProcessDueRemindersAsync();

                await Task.Delay(TimeSpan.FromSeconds(30), cancellationToken);
            }
        }
    }
}