namespace TravelPlanner.Contracts.DTOs.Trips.TravelPlans
{
    public class TravelPlanListItemDto
    {
        public int Id { get; set; }

        public int OwnerUserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal Budget { get; set; }
    }
}