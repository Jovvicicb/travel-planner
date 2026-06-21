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
    }
}