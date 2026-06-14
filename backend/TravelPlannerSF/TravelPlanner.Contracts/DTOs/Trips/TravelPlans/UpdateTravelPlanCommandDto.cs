namespace TravelPlanner.Contracts.DTOs.Trips.TravelPlans
{
    public class UpdateTravelPlanCommandDto
    {
        public int PlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal Budget { get; set; }

        public string? Notes { get; set; }
    }
}