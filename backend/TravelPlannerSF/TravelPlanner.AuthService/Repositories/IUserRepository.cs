using TravelPlanner.AuthService.Entities;

namespace TravelPlanner.AuthService.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByEmailAsync(string email);

        Task<bool> EmailExistsAsync(string email);

        Task<User> CreateAsync(User user);
    }
}