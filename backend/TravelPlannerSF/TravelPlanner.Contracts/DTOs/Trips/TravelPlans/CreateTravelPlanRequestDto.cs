namespace TravelPlanner.Contracts.DTOs.Trips.TravelPlans
{
    public class CreateTravelPlanRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal Budget { get; set; }

        public string? Notes { get; set; }
    }
}