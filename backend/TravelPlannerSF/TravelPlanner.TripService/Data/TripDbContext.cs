using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Entities.TravelPlans;
using TravelPlanner.TripService.Entities.Destinations;

namespace TravelPlanner.TripService.Data
{
    public class TripDbContext : DbContext
    {
        public TripDbContext(DbContextOptions<TripDbContext> options)
            : base(options)
        {
        }

        public DbSet<TravelPlan> TravelPlans => Set<TravelPlan>();
        public DbSet<Destination> Destinations => Set<Destination>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TravelPlan>(entity =>
            {
                entity.ToTable("TravelPlans");

                entity.HasKey(plan => plan.Id);

                entity.Property(plan => plan.OwnerUserId)
                    .IsRequired();

                entity.Property(plan => plan.Title)
                    .IsRequired()
                    .HasMaxLength(120);

                entity.Property(plan => plan.Description)
                    .HasMaxLength(1000);

                entity.Property(plan => plan.StartDate)
                    .IsRequired();

                entity.Property(plan => plan.EndDate)
                    .IsRequired();

                entity.Property(plan => plan.Budget)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.Property(plan => plan.Notes)
                    .HasMaxLength(2000);

                entity.Property(plan => plan.CreatedAt)
                    .IsRequired();

                entity.Property(plan => plan.UpdatedAt)
                    .IsRequired(false);
            });

            modelBuilder.Entity<Destination>(entity =>
            {
                entity.ToTable("Destinations");

                entity.HasKey(destination => destination.Id);

                entity.Property(destination => destination.TravelPlanId)
                    .IsRequired();

                entity.Property(destination => destination.Name)
                    .IsRequired()
                    .HasMaxLength(120);

                entity.Property(destination => destination.Location)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(destination => destination.StartDate)
                    .IsRequired();

                entity.Property(destination => destination.EndDate)
                    .IsRequired();

                entity.Property(destination => destination.Notes)
                    .HasMaxLength(2000);

                entity.Property(destination => destination.CreatedAt)
                    .IsRequired();

                entity.Property(destination => destination.UpdatedAt)
                    .IsRequired(false);

                entity.HasOne(destination => destination.TravelPlan)
                    .WithMany(plan => plan.Destinations)
                    .HasForeignKey(destination => destination.TravelPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}