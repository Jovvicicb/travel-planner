namespace TravelPlanner.Contracts.DTOs.Trips.Destinations
{
    public class CreateDestinationCommandDto
    {
        public int TravelPlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Notes { get; set; }
    }
}