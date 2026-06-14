using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TravelPlanner.TripService.Data
{
    public class TripDbContextFactory : IDesignTimeDbContextFactory<TripDbContext>
    {
        public TripDbContext CreateDbContext(string[] args)
        {
            var basePath = Directory.GetCurrentDirectory();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<TripDbContext>();

            optionsBuilder.UseSqlServer(
                configuration.GetConnectionString("TripDb")
            );

            return new TripDbContext(optionsBuilder.Options);
        }
    }
}