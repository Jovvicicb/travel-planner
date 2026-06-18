using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.Interfaces.Trips;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/shared/trips")]
    public class SharedTripsController : ControllerBase
    {
        private readonly ITripService tripService;

        public SharedTripsController()
        {
            tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> GetSharedTravelPlan(string token)
        {
            var result = await tripService.GetSharedTravelPlanAsync(token);

            return ResponseHelper.Send(this, result);
        }
    }
}