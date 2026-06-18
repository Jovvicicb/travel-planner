using System.Security.Cryptography;

namespace TravelPlanner.TripService.Helpers
{
    public static class ShareTokenGenerator
    {
        public static string Generate()
        {
            var bytes = RandomNumberGenerator.GetBytes(32);

            return Convert.ToBase64String(bytes)
                .Replace("+", "")
                .Replace("/", "")
                .Replace("=", "");
        }
    }
}