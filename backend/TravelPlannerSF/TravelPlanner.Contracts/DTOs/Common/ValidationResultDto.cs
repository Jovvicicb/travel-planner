namespace TravelPlanner.Contracts.DTOs.Common
{
    public class ValidationResultDto
    {
        public bool IsValid { get; set; }

        public string Message { get; set; } = string.Empty;

        public static ValidationResultDto Success()
        {
            return new ValidationResultDto
            {
                IsValid = true
            };
        }

        public static ValidationResultDto Fail(string message)
        {
            return new ValidationResultDto
            {
                IsValid = false,
                Message = message
            };
        }
    }
}