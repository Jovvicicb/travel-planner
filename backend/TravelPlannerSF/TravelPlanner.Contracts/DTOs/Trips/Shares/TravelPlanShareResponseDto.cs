using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class TravelPlanShareResponseDto
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Token { get; set; } = string.Empty;

        public string ShareUrl { get; set; } = string.Empty;

        public ShareAccessLevel AccessLevel { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}