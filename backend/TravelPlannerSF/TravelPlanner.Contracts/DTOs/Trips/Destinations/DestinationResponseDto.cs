namespace TravelPlanner.Contracts.DTOs.Trips.Destinations
{
    public class DestinationResponseDto
    {
        public int Id { get; set; }

        public int TravelPlanId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}