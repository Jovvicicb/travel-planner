using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.Contracts.Interfaces.Trips;
using TravelPlanner.NotificationService.Entities.Notifications;
using TravelPlanner.NotificationService.Mapping.Notifications;
using TravelPlanner.NotificationService.Repositories.Notifications;
using TravelPlanner.NotificationService.Validation.Notifications;

namespace TravelPlanner.NotificationService.Services.Notifications
{
    public class NotificationManager : INotificationManager
    {
        private readonly IReminderRepository reminderRepository;

        private readonly ITripService tripService;

        public NotificationManager(IReminderRepository reminderRepository)
        {
            this.reminderRepository = reminderRepository;

            this.tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> CreateReminderAsync(CreateReminderCommandDto command)
        {
            var validation = ReminderValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                command.TravelPlanId,
                command.UserId,
                command.IsAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            var reminder = new Reminder
            {
                Id = Guid.NewGuid(),
                TravelPlanId = command.TravelPlanId,
                UserId = command.UserId,
                Title = command.Title.Trim(),
                Description = command.Description?.Trim(),
                ReminderAt = command.ReminderAt,
                Status = ReminderStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            var createdReminder = await reminderRepository.CreateAsync(reminder);

            return ServiceResultDto<ReminderResponseDto>.Created(
                ReminderMapper.ToResponse(createdReminder),
                "Reminder created successfully."
            );
        }
    }
}