namespace TravelPlanner.AuthService.Validation
{
    public class AuthValidationResult
    {
        public bool IsValid { get; set; }

        public string Message { get; set; } = string.Empty;

        public static AuthValidationResult Success()
        {
            return new AuthValidationResult
            {
                IsValid = true
            };
        }

        public static AuthValidationResult Fail(string message)
        {
            return new AuthValidationResult
            {
                IsValid = false,
                Message = message
            };
        }
    }
}