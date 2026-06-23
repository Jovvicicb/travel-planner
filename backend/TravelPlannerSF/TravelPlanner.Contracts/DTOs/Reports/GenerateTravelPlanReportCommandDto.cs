namespace TravelPlanner.Contracts.DTOs.Reports
{
    public class GenerateTravelPlanReportCommandDto
    {
        public int TravelPlanId { get; set; }

        public int RequestUserId { get; set; }

        public bool IsAdmin { get; set; }
    }
}