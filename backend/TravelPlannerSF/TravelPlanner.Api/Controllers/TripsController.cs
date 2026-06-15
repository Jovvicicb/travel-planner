using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
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
        //TravelPlan
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

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteTravelPlanAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        //Destination
        [HttpPost("{tripId:int}/destinations")]
        public async Task<IActionResult> CreateDestination(int tripId, [FromBody] CreateDestinationRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateDestinationCommandDto
            {
                TravelPlanId = tripId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Name = request.Name,
                Location = request.Location,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Notes = request.Notes
            };

            var result = await tripService.CreateDestinationAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/destinations")]
        public async Task<IActionResult> GetDestinations(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetDestinationsAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{tripId:int}/destinations/{destinationId:int}")]
        public async Task<IActionResult> UpdateDestination(int tripId, int destinationId, [FromBody] UpdateDestinationRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateDestinationCommandDto
            {
                TravelPlanId = tripId,
                DestinationId = destinationId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Name = request.Name,
                Location = request.Location,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Notes = request.Notes
            };

            var result = await tripService.UpdateDestinationAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{tripId:int}/destinations/{destinationId:int}")]
        public async Task<IActionResult> DeleteDestination(int tripId, int destinationId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteDestinationAsync(
                tripId,
                destinationId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }
    }
}