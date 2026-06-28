using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.Contracts.Interfaces.Notifications;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/reminders")]
    public class RemindersController : ControllerBase
    {
        private readonly INotificationService notificationService;

        public RemindersController()
        {
            notificationService = ServiceProxy.Create<INotificationService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.NotificationService"),
                new ServicePartitionKey(0)
            );
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReminderRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateReminderCommandDto
            {
                TravelPlanId = request.TravelPlanId,
                UserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Description = request.Description,
                ReminderAt = request.ReminderAt
            };

            var result = await notificationService.CreateReminderAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.GetReminderAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("trip/{tripId:int}")]
        public async Task<IActionResult> GetByTravelPlan(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.GetRemindersByTravelPlanAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("triggered")]
        public async Task<IActionResult> GetTriggered()
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.GetTriggeredRemindersAsync(
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("triggered/count")]
        public async Task<IActionResult> GetTriggeredCount()
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.GetTriggeredReminderCountAsync(
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateReminderRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateReminderCommandDto
            {
                ReminderId = id,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Description = request.Description,
                ReminderAt = request.ReminderAt
            };

            var result = await notificationService.UpdateReminderAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpPatch("{id:guid}/complete")]
        public async Task<IActionResult> Complete(Guid id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.CompleteReminderAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await notificationService.DeleteReminderAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }
    }
}