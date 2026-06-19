using Microsoft.EntityFrameworkCore;
using TravelPlanner.TripService.Entities.Activities;
using TravelPlanner.TripService.Entities.Checklist;
using TravelPlanner.TripService.Entities.Collaborators;
using TravelPlanner.TripService.Entities.Destinations;
using TravelPlanner.TripService.Entities.Expenses;
using TravelPlanner.TripService.Entities.Shares;
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
        public DbSet<Destination> Destinations => Set<Destination>();
        public DbSet<Activity> Activities => Set<Activity>();
        public DbSet<Expense> Expenses => Set<Expense>();
        public DbSet<ChecklistItem> ChecklistItems => Set<ChecklistItem>();
        public DbSet<TravelPlanShare> TravelPlanShares => Set<TravelPlanShare>();
        public DbSet<TravelPlanCollaborator> TravelPlanCollaborators => Set<TravelPlanCollaborator>();

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

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.ToTable("Activities");

                entity.HasKey(activity => activity.Id);

                entity.Property(activity => activity.DestinationId)
                    .IsRequired();

                entity.Property(activity => activity.Title)
                    .IsRequired()
                    .HasMaxLength(120);

                entity.Property(activity => activity.ActivityDate)
                    .IsRequired();

                entity.Property(activity => activity.StartTime)
                    .IsRequired();

                entity.Property(activity => activity.EndTime)
                    .IsRequired();

                entity.Property(activity => activity.Location)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(activity => activity.Description)
                    .HasMaxLength(1000);

                entity.Property(activity => activity.EstimatedCost)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.Property(activity => activity.Status)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(activity => activity.CreatedAt)
                    .IsRequired();

                entity.Property(activity => activity.UpdatedAt)
                    .IsRequired(false);

                entity.HasOne(activity => activity.Destination)
                    .WithMany(destination => destination.Activities)
                    .HasForeignKey(activity => activity.DestinationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.ToTable("Expenses");

                entity.HasKey(expense => expense.Id);

                entity.Property(expense => expense.TravelPlanId)
                    .IsRequired();

                entity.Property(expense => expense.Title)
                    .IsRequired()
                    .HasMaxLength(120);

                entity.Property(expense => expense.Category)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(expense => expense.Amount)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.Property(expense => expense.ExpenseDate)
                    .IsRequired();

                entity.Property(expense => expense.Description)
                    .HasMaxLength(1000);

                entity.Property(expense => expense.CreatedAt)
                    .IsRequired();

                entity.Property(expense => expense.UpdatedAt)
                    .IsRequired(false);

                entity.HasOne(expense => expense.TravelPlan)
                    .WithMany(plan => plan.Expenses)
                    .HasForeignKey(expense => expense.TravelPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ChecklistItem>(entity =>
            {
                entity.ToTable("ChecklistItems");

                entity.HasKey(item => item.Id);

                entity.Property(item => item.TravelPlanId)
                    .IsRequired();

                entity.Property(item => item.Title)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(item => item.IsCompleted)
                    .IsRequired();

                entity.Property(item => item.CreatedAt)
                    .IsRequired();

                entity.Property(item => item.UpdatedAt)
                    .IsRequired(false);

                entity.HasOne(item => item.TravelPlan)
                    .WithMany(plan => plan.ChecklistItems)
                    .HasForeignKey(item => item.TravelPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<TravelPlanShare>(entity =>
            {
                entity.ToTable("TravelPlanShares");

                entity.HasKey(share => share.Id);

                entity.Property(share => share.TravelPlanId)
                    .IsRequired();

                entity.Property(share => share.Token)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(share => share.Token)
                    .IsUnique();

                entity.Property(share => share.AccessLevel)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(share => share.ExpiresAt)
                    .IsRequired(false);

                entity.Property(share => share.IsActive)
                    .IsRequired();

                entity.Property(share => share.CreatedAt)
                    .IsRequired();

                entity.HasOne(share => share.TravelPlan)
                    .WithMany(plan => plan.Shares)
                    .HasForeignKey(share => share.TravelPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<TravelPlanCollaborator>(entity =>
            {
                entity.ToTable("TravelPlanCollaborators");

                entity.HasKey(collaborator => collaborator.Id);

                entity.Property(collaborator => collaborator.TravelPlanId)
                    .IsRequired();

                entity.Property(collaborator => collaborator.UserId)
                    .IsRequired();

                entity.Property(collaborator => collaborator.AccessLevel)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(collaborator => collaborator.CreatedAt)
                    .IsRequired();

                entity.HasIndex(collaborator => new
                {
                    collaborator.TravelPlanId,
                    collaborator.UserId
                }).IsUnique();

                entity.HasOne(collaborator => collaborator.TravelPlan)
                    .WithMany(plan => plan.Collaborators)
                    .HasForeignKey(collaborator => collaborator.TravelPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}