using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TravelPlanner.AuthService.Data
{
    // Provides AuthDbContext creation for EF Core migrations outside Service Fabric runtime.
    public class AuthDbContextFactory : IDesignTimeDbContextFactory<AuthDbContext>
    {
        public AuthDbContext CreateDbContext(string[] args)
        {
            var basePath = Directory.GetCurrentDirectory();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<AuthDbContext>();

            optionsBuilder.UseSqlServer(
                configuration.GetConnectionString("AuthDb")
            );

            return new AuthDbContext(optionsBuilder.Options);
        }
    }
}