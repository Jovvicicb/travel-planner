using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Entities.TravelPlans;

namespace TravelPlanner.TripService.Data
{
    public class TripDbContext : DbContext
    {
        public TripDbContext(DbContextOptions<TripDbContext> options)
            : base(options)
        {
        }

        public DbSet<TravelPlan> TravelPlans => Set<TravelPlan>();

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
        }
    }
}