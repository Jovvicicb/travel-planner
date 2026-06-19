using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelPlanner.AuthService.Configuration;
using TravelPlanner.AuthService.Data;
using TravelPlanner.AuthService.Repositories;
using TravelPlanner.AuthService.Services.Auth;
using TravelPlanner.AuthService.Services.Tokens;
using TravelPlanner.Contracts.DTOs.Auth;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.Contracts.Interfaces;


namespace TravelPlanner.AuthService
{
    internal sealed class AuthService : StatelessService, IAuthService
    {
        private readonly IServiceProvider serviceProvider;

        public AuthService(StatelessServiceContext context)
            : base(context)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(context.CodePackageActivationContext.GetCodePackageObject("Code").Path)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
                .Build();

            var services = new ServiceCollection();

            services.AddDbContext<AuthDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("AuthDb"));
            });

            services.AddScoped<IUserRepository, UserRepository>();
            services.Configure<JwtSettings>(configuration.GetSection("Jwt"));
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<IAuthManager, AuthManager>();

            this.serviceProvider = services.BuildServiceProvider();
        }

        public async Task<ServiceResultDto<AuthResponseDto>> RegisterAsync(RegisterRequestDto request)
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.RegisterAsync(request);
        }

        public async Task<ServiceResultDto<AuthResponseDto>> LoginAsync(LoginRequestDto request)
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.LoginAsync(request);
        }

        public async Task<ServiceResultDto<CurrentUserDto>> GetCurrentUserAsync(int userId)
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.GetCurrentUserAsync(userId);
        }

        public async Task<ServiceResultDto<List<AdminUserResponseDto>>> GetUsersAsync()
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.GetUsersAsync();
        }

        public async Task<ServiceResultDto<AdminUserResponseDto>> GetUserByIdAsync(int userId)
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.GetUserByIdAsync(userId);
        }

        public async Task<ServiceResultDto<AdminUserResponseDto>> UpdateUserRoleAsync(int userId, UserRole role)
        {
            using var scope = serviceProvider.CreateScope();

            var authManager = scope.ServiceProvider.GetRequiredService<IAuthManager>();

            return await authManager.UpdateUserRoleAsync(userId, role);
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}