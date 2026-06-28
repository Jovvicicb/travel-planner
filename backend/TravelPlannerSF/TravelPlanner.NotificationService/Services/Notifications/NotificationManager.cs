using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Notifications;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.Contracts.Interfaces.Trips;
using TravelPlanner.NotificationService.Entities.Notifications;
using TravelPlanner.NotificationService.Mapping.Notifications;
using TravelPlanner.NotificationService.Repositories.Notifications;
using TravelPlanner.NotificationService.Services.State;
using TravelPlanner.NotificationService.Validation.Notifications;

namespace TravelPlanner.NotificationService.Services.Notifications
{
    public class NotificationManager : INotificationManager
    {
        private readonly IReminderRepository reminderRepository;

        private readonly ITripService tripService;

        private readonly IReminderStateStore reminderStateStore;

        public NotificationManager(IReminderRepository reminderRepository, IReminderStateStore reminderStateStore)
        {
            this.reminderRepository = reminderRepository;
            this.reminderStateStore = reminderStateStore;

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

            await reminderStateStore.UpsertAsync(ReminderMapper.ToState(createdReminder));

            return ServiceResultDto<ReminderResponseDto>.Created(
                ReminderMapper.ToResponse(createdReminder),
                "Reminder created successfully."
            );
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> GetReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            var validation = ReminderValidator.ValidateGet(reminderId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var reminder = await reminderRepository.GetByIdAsync(reminderId);

            if (reminder == null)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail("Reminder not found.", 404);
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                reminder.TravelPlanId,
                requestUserId,
                isAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            return ServiceResultDto<ReminderResponseDto>.Ok(
                ReminderMapper.ToResponse(reminder),
                "Reminder fetched successfully."
            );
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetRemindersByTravelPlanAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            var validation = ReminderValidator.ValidateGetByTravelPlan(travelPlanId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<List<ReminderResponseDto>>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                travelPlanId,
                requestUserId,
                isAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto<List<ReminderResponseDto>>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            var reminders = await reminderRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = reminders
                .Select(ReminderMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<ReminderResponseDto>>.Ok(
                response,
                "Reminders fetched successfully."
            );
        }

        public async Task<ServiceResultDto<List<ReminderResponseDto>>> GetTriggeredRemindersAsync(int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<ReminderResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            var reminders = await reminderRepository.GetByStatusAsync(ReminderStatus.Triggered);

            var response = reminders
                .Where(reminder => isAdmin || reminder.UserId == requestUserId)
                .Select(ReminderMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<ReminderResponseDto>>.Ok(
                response,
                "Triggered reminders fetched successfully."
            );
        }

        public async Task<ServiceResultDto<int>> GetTriggeredReminderCountAsync(int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<int>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            var count = isAdmin
                ? await reminderRepository.CountByStatusAsync(ReminderStatus.Triggered)
                : await reminderRepository.CountByStatusAndUserIdAsync(
                    ReminderStatus.Triggered,
                    requestUserId
                );

            return ServiceResultDto<int>.Ok(
                count,
                "Triggered reminder count fetched successfully."
            );
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> UpdateReminderAsync(UpdateReminderCommandDto command)
        {
            var validation = ReminderValidator.ValidateUpdate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var reminder = await reminderRepository.GetByIdAsync(command.ReminderId);

            if (reminder == null)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail("Reminder not found.", 404);
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                reminder.TravelPlanId,
                command.RequestUserId,
                command.IsAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            reminder.Title = command.Title.Trim();
            reminder.Description = command.Description?.Trim();
            reminder.ReminderAt = command.ReminderAt;
            reminder.Status = ReminderStatus.Pending;
            reminder.CompletedAt = null;

            await reminderRepository.UpdateAsync(reminder);

            await reminderStateStore.UpsertAsync(ReminderMapper.ToState(reminder));

            return ServiceResultDto<ReminderResponseDto>.Ok(
                ReminderMapper.ToResponse(reminder),
                "Reminder updated successfully."
            );
        }

        public async Task<ServiceResultDto<ReminderResponseDto>> CompleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            var validation = ReminderValidator.ValidateReminderAction(reminderId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var reminder = await reminderRepository.GetByIdAsync(reminderId);

            if (reminder == null)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail("Reminder not found.", 404);
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                reminder.TravelPlanId,
                requestUserId,
                isAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto<ReminderResponseDto>.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            if (reminder.Status == ReminderStatus.Completed)
            {
                return ServiceResultDto<ReminderResponseDto>.Ok(
                    ReminderMapper.ToResponse(reminder),
                    "Reminder is already completed."
                );
            }

            reminder.Status = ReminderStatus.Completed;
            reminder.CompletedAt = DateTime.UtcNow;

            await reminderRepository.UpdateAsync(reminder);

            await reminderStateStore.RemoveAsync(reminder.Id);

            return ServiceResultDto<ReminderResponseDto>.Ok(
                ReminderMapper.ToResponse(reminder),
                "Reminder completed successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteReminderAsync(Guid reminderId, int requestUserId, bool isAdmin)
        {
            var validation = ReminderValidator.ValidateReminderAction(reminderId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var reminder = await reminderRepository.GetByIdAsync(reminderId);

            if (reminder == null)
            {
                return ServiceResultDto.Fail("Reminder not found.", 404);
            }

            var travelPlanResult = await tripService.GetTravelPlanByIdAsync(
                reminder.TravelPlanId,
                requestUserId,
                isAdmin
            );

            if (!travelPlanResult.Success)
            {
                return ServiceResultDto.Fail(
                    travelPlanResult.Message,
                    travelPlanResult.StatusCode
                );
            }

            await reminderRepository.DeleteAsync(reminder);

            await reminderStateStore.RemoveAsync(reminder.Id);

            return ServiceResultDto.Ok("Reminder deleted successfully.");
        }
    }
}