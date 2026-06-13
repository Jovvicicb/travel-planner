using Microsoft.AspNetCore.Mvc;
using TravelPlanner.Contracts.DTOs.Common;

namespace TravelPlanner.Api.Helpers
{
    public static class ResponseHelper
    {
        public static IActionResult Send<T>(ControllerBase controller, ServiceResultDto<T> result)
        {
            return controller.StatusCode(result.StatusCode, new
            {
                success = result.Success,
                message = result.Message,
                data = result.Data
            });
        }

        public static IActionResult Send(ControllerBase controller, ServiceResultDto result)
        {
            return controller.StatusCode(result.StatusCode, new
            {
                success = result.Success,
                message = result.Message
            });
        }
    }
}