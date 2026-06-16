namespace TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar
{
    public class CalendarDayDto
    {
        public DateTime Date { get; set; }

        public List<ActivityResponseDto> Activities { get; set; } = [];
    }
}