using TravelPlanner.Api.Middleware;

namespace TravelPlanner.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(
            this IApplicationBuilder app)
        {
            return app.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}