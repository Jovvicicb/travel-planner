using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.DTOs.Reports;
using TravelPlanner.Contracts.Interfaces.Reports;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/trips/{tripId:int}/report")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService reportService;

        public ReportsController()
        {
            reportService = ServiceProxy.Create<IReportService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.ReportService")
            );
        }

        [HttpGet]
        public async Task<IActionResult> Download(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return Unauthorized();
            }

            var command = new GenerateTravelPlanReportCommandDto
            {
                TravelPlanId = tripId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin
            };

            var result = await reportService.GenerateTravelPlanReportAsync(command);

            if (!result.Success || result.Data == null)
            {
                return StatusCode(result.StatusCode, result);
            }

            return File(
                result.Data.Content,
                "application/pdf",
                result.Data.FileName
            );
        }
    }
}