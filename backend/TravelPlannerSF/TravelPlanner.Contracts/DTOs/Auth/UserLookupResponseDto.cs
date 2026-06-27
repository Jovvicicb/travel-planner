namespace TravelPlanner.Contracts.DTOs.Auth
{
    public class UserLookupResponseDto
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}