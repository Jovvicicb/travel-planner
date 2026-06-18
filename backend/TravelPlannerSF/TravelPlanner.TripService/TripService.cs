using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.Interfaces.Trips;
using TravelPlanner.TripService.Data;
using TravelPlanner.TripService.Repositories.Activities;
using TravelPlanner.TripService.Repositories.Checklist;
using TravelPlanner.TripService.Repositories.Destinations;
using TravelPlanner.TripService.Repositories.Expenses;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.Activities;
using TravelPlanner.TripService.Services.Checklist;
using TravelPlanner.TripService.Services.Destinations;
using TravelPlanner.TripService.Services.Expenses;
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

            services.AddScoped<IDestinationRepository, DestinationRepository>();
            services.AddScoped<IDestinationManager, DestinationManager>();

            services.AddScoped<IActivityRepository, ActivityRepository>();
            services.AddScoped<IActivityManager, ActivityManager>();

            services.AddScoped<IExpenseRepository, ExpenseRepository>();
            services.AddScoped<IExpenseManager, ExpenseManager>();

            services.AddScoped<IChecklistRepository, ChecklistRepository>();
            services.AddScoped<IChecklistManager, ChecklistManager>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        //TravelPlan
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

        public async Task<ServiceResultDto<TravelPlanResponseDto>> UpdateTravelPlanAsync(UpdateTravelPlanCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<ITravelPlanManager>();

            return await manager.UpdateTravelPlanAsync(command);
        }

        public async Task<ServiceResultDto> DeleteTravelPlanAsync(int planId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<ITravelPlanManager>();

            return await manager.DeleteTravelPlanAsync(planId, requestUserId, isAdmin);
        }


        //Destination
        public async Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IDestinationManager>();

            return await manager.CreateDestinationAsync(command);
        }

        public async Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IDestinationManager>();

            return await manager.GetDestinationsAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<DestinationResponseDto>> UpdateDestinationAsync(UpdateDestinationCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IDestinationManager>();

            return await manager.UpdateDestinationAsync(command);
        }

        public async Task<ServiceResultDto> DeleteDestinationAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IDestinationManager>();

            return await manager.DeleteDestinationAsync(travelPlanId, destinationId, requestUserId, isAdmin);
        }


        //Activity
        public async Task<ServiceResultDto<ActivityResponseDto>> CreateActivityAsync(CreateActivityCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IActivityManager>();

            return await manager.CreateActivityAsync(command);
        }

        public async Task<ServiceResultDto<List<ActivityResponseDto>>> GetActivitiesAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IActivityManager>();

            return await manager.GetActivitiesAsync(travelPlanId, destinationId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<List<CalendarDayDto>>> GetActivityCalendarAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IActivityManager>();

            return await manager.GetCalendarAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<ActivityResponseDto>> UpdateActivityAsync(UpdateActivityCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IActivityManager>();

            return await manager.UpdateActivityAsync(command);
        }

        public async Task<ServiceResultDto> DeleteActivityAsync(int travelPlanId, int destinationId, int activityId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IActivityManager>();

            return await manager.DeleteActivityAsync( travelPlanId, destinationId, activityId, requestUserId, isAdmin);
        }


        //Expense
        public async Task<ServiceResultDto<ExpenseResponseDto>> CreateExpenseAsync(CreateExpenseCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IExpenseManager>();

            return await manager.CreateExpenseAsync(command);
        }

        public async Task<ServiceResultDto<List<ExpenseResponseDto>>> GetExpensesAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IExpenseManager>();

            return await manager.GetExpensesAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<ExpenseResponseDto>> UpdateExpenseAsync(UpdateExpenseCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IExpenseManager>();

            return await manager.UpdateExpenseAsync(command);
        }

        public async Task<ServiceResultDto> DeleteExpenseAsync(int travelPlanId, int expenseId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IExpenseManager>();

            return await manager.DeleteExpenseAsync(travelPlanId, expenseId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<BudgetSummaryDto>> GetBudgetSummaryAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IExpenseManager>();

            return await manager.GetBudgetSummaryAsync(travelPlanId, requestUserId,isAdmin);
        }


        //Checklist
        public async Task<ServiceResultDto<ChecklistItemResponseDto>> CreateChecklistItemAsync(CreateChecklistItemCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IChecklistManager>();

            return await manager.CreateChecklistItemAsync(command);
        }

        public async Task<ServiceResultDto<List<ChecklistItemResponseDto>>> GetChecklistItemsAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IChecklistManager>();

            return await manager.GetChecklistItemsAsync(travelPlanId, requestUserId, isAdmin);
        }

        public async Task<ServiceResultDto<ChecklistItemResponseDto>> UpdateChecklistItemAsync(UpdateChecklistItemCommandDto command)
        {
            using var scope = serviceProvider.CreateScope();

            var manager = scope.ServiceProvider.GetRequiredService<IChecklistManager>();

            return await manager.UpdateChecklistItemAsync(command);
        }


        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

    }
}