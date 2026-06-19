using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.Contracts.DTOs.Trips.Shares
{
    public class ClaimShareResponseDto
    {
        public int TravelPlanId { get; set; }

        public int UserId { get; set; }

        public ShareAccessLevel AccessLevel { get; set; }

        public bool AlreadyHadAccess { get; set; }
    }
}