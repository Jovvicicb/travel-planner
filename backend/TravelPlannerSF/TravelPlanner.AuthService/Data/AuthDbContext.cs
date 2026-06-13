using Microsoft.EntityFrameworkCore;
using TravelPlanner.AuthService.Entities;

namespace TravelPlanner.AuthService.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(user => user.Id);

                entity.Property(user => user.FullName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(user => user.Email)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasIndex(user => user.Email)
                    .IsUnique();

                entity.Property(user => user.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(user => user.Role)
                    .IsRequired()
                    .HasConversion<string>()
                    .HasMaxLength(30);

                entity.Property(user => user.IsActive)
                    .IsRequired();

                entity.Property(user => user.CreatedAt)
                    .IsRequired();

                entity.Property(user => user.UpdatedAt)
                    .IsRequired(false);
            });
        }
    }
}