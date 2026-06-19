using Microsoft.EntityFrameworkCore;
using TravelPlanner.AuthService.Data;
using TravelPlanner.AuthService.Entities;

namespace TravelPlanner.AuthService.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AuthDbContext dbContext;

        public async Task<List<User>> GetAllAsync()
        {
            return await dbContext.Users
                .OrderByDescending(user => user.CreatedAt)
                .ToListAsync();
        }
        public UserRepository(AuthDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Id == id && user.IsActive);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Email == email && user.IsActive);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await dbContext.Users
                .AnyAsync(user => user.Email == email);
        }

        public async Task<User> CreateAsync(User user)
        {
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return user;
        }
    }
}