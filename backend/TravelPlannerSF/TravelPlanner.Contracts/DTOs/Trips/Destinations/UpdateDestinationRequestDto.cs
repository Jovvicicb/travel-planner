namespace TravelPlanner.Contracts.DTOs.Trips.Destinations
{
    public class UpdateDestinationRequestDto
    {
        public string Name { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Notes { get; set; }
    }
}