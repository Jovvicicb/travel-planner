namespace TravelPlanner.Contracts.DTOs.Common
{
    // Standard validation result used by validator classes.
    public class ValidationResultDto
    {
        public bool IsValid { get; set; }

        public string Message { get; set; } = string.Empty;

        public int StatusCode { get; set; } = 400;


        public static ValidationResultDto Success()
        {
            return new ValidationResultDto
            {
                IsValid = true,
                StatusCode = 200
            };
        }

        public static ValidationResultDto Fail(string message, int statusCode = 400)
        {
            return new ValidationResultDto
            {
                IsValid = false,
                Message = message,
                StatusCode = statusCode
            };
        }
    }
}