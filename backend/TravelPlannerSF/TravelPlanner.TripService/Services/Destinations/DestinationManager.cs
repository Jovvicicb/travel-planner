using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.TripService.Entities.Destinations;
using TravelPlanner.TripService.Mapping.Destinations;
using TravelPlanner.TripService.Repositories.Destinations;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.Permissions;
using TravelPlanner.TripService.Validation.Destinations;
using TravelPlanner.TripService.Repositories.Activities;

namespace TravelPlanner.TripService.Services.Destinations
{
    public class DestinationManager : IDestinationManager
    {
        private readonly IDestinationRepository destinationRepository;
        private readonly ITravelPlanRepository travelPlanRepository;
        private readonly ITravelPlanPermissionService permissionService;
        private readonly IActivityRepository activityRepository;

        public DestinationManager(
            IDestinationRepository destinationRepository,
            ITravelPlanRepository travelPlanRepository,
            ITravelPlanPermissionService permissionService,
            IActivityRepository activityRepository)
        {
            this.destinationRepository = destinationRepository;
            this.travelPlanRepository = travelPlanRepository;
            this.permissionService = permissionService;
            this.activityRepository = activityRepository;
        }

        public async Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail("Destination data is required.");
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "You do not have permission to add destinations to this travel plan.",
                    403
                );
            }

            var validation = DestinationValidator.ValidateCreate(command, travelPlan);

            if (!validation.IsValid)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var destination = new Destination
            {
                TravelPlanId = command.TravelPlanId,
                Name = command.Name.Trim(),
                Location = command.Location.Trim(),
                StartDate = command.StartDate,
                EndDate = command.EndDate,
                Notes = command.Notes?.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var createdDestination = await destinationRepository.CreateAsync(destination);

            return ServiceResultDto<DestinationResponseDto>.Created(
                DestinationMapper.ToResponse(createdDestination),
                "Destination created successfully."
            );
        }

        public async Task<ServiceResultDto<List<DestinationResponseDto>>> GetDestinationsAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            var validation = DestinationValidator.ValidateGetAll(travelPlanId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<List<DestinationResponseDto>>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<DestinationResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canView = await permissionService.CanViewAsync(travelPlan, requestUserId, isAdmin);

            if (!canView)
            {
                return ServiceResultDto<List<DestinationResponseDto>>.Fail(
                    "You do not have permission to view destinations for this travel plan.",
                    403
                );
            }

            var destinations = await destinationRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = destinations
                .Select(DestinationMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<DestinationResponseDto>>.Ok(
                response,
                "Destinations fetched successfully."
            );
        }

        public async Task<ServiceResultDto<DestinationResponseDto>> UpdateDestinationAsync(UpdateDestinationCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Destination data is required."
                );
            }

            var destination = await destinationRepository.GetByIdAsync(command.DestinationId);

            if (destination == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Destination not found.",
                    404
                );
            }

            if (destination.TravelPlanId != command.TravelPlanId)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Destination does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(destination.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "You do not have permission to update this destination.",
                    403
                );
            }

            var validation = DestinationValidator.ValidateUpdate(command, travelPlan);

            if (!validation.IsValid)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var activities = await activityRepository.GetByDestinationIdAsync(command.DestinationId);

            var hasActivityOutsideNewDateRange = activities.Any(activity =>
                activity.ActivityDate.Date < command.StartDate.Date ||
                activity.ActivityDate.Date > command.EndDate.Date
            );

            if (hasActivityOutsideNewDateRange)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Destination dates cannot be updated because one or more activities are outside the new date range.",
                    400
                );
            }

            destination.Name = command.Name.Trim();
            destination.Location = command.Location.Trim();
            destination.StartDate = command.StartDate;
            destination.EndDate = command.EndDate;
            destination.Notes = command.Notes?.Trim();
            destination.UpdatedAt = DateTime.UtcNow;

            await destinationRepository.UpdateAsync(destination);

            return ServiceResultDto<DestinationResponseDto>.Ok(
                DestinationMapper.ToResponse(destination),
                "Destination updated successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteDestinationAsync(int travelPlanId, int destinationId, int requestUserId, bool isAdmin)
        {
            var validation = DestinationValidator.ValidateDelete(travelPlanId, destinationId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var destination = await destinationRepository.GetByIdAsync(destinationId);

            if (destination == null)
            {
                return ServiceResultDto.Fail("Destination not found.", 404);
            }

            if (destination.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto.Fail(
                    "Destination does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto.Fail("Travel plan not found.", 404);
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, requestUserId, isAdmin);

            if (!canEdit)
            {
                return ServiceResultDto.Fail(
                    "You do not have permission to delete this destination.",
                    403
                );
            }

            await destinationRepository.DeleteAsync(destination);

            return ServiceResultDto.Ok("Destination deleted successfully.");
        }
    }
}