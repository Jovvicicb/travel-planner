using Microsoft.EntityFrameworkCore;
using TravelPlanner.NotificationService.Entities.Notifications;

namespace TravelPlanner.NotificationService.Data
{
    public class NotificationDbContext : DbContext
    {
        public NotificationDbContext(DbContextOptions<NotificationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Reminder> Reminders => Set<Reminder>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Reminder>(entity =>
            {
                entity.ToTable("Reminders");

                entity.HasKey(reminder => reminder.Id);

                entity.Property(reminder => reminder.TravelPlanId)
                    .IsRequired();

                entity.Property(reminder => reminder.UserId)
                    .IsRequired();

                entity.Property(reminder => reminder.Title)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(reminder => reminder.Description)
                    .HasMaxLength(1000);

                entity.Property(reminder => reminder.ReminderAt)
                    .IsRequired();

                entity.Property(reminder => reminder.Status)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(reminder => reminder.CreatedAt)
                    .IsRequired();

                entity.Property(reminder => reminder.CompletedAt)
                    .IsRequired(false);
            });
        }
    }
}