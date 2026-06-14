using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.Interfaces.Trips;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/trips")]
    public class TripsController : ControllerBase
    {
        private readonly ITripService tripService;

        public TripsController()
        {
            tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTravelPlanRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateTravelPlanCommandDto
            {
                OwnerUserId = userContext.Value.UserId,
                Title = request.Title,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Budget = request.Budget,
                Notes = request.Notes
            };

            var result = await tripService.CreateTravelPlanAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetTravelPlansAsync(
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetTravelPlanByIdAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTravelPlanRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateTravelPlanCommandDto
            {
                PlanId = id,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Budget = request.Budget,
                Notes = request.Notes
            };

            var result = await tripService.UpdateTravelPlanAsync(command);

            return ResponseHelper.Send(this, result);
        }
    }
}