namespace TravelPlanner.Contracts.DTOs.Reports
{
    public class TravelPlanReportDto
    {
        public string FileName { get; set; } = string.Empty;

        public byte[] Content { get; set; } = Array.Empty<byte>();
    }
}