using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.TripService.Entities.Destinations;
using TravelPlanner.TripService.Mapping.Destinations;
using TravelPlanner.TripService.Repositories.Destinations;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.Destinations;

namespace TravelPlanner.TripService.Services.Destinations
{
    public class DestinationManager : IDestinationManager
    {
        private readonly IDestinationRepository destinationRepository;
        private readonly ITravelPlanRepository travelPlanRepository;

        public DestinationManager(
            IDestinationRepository destinationRepository,
            ITravelPlanRepository travelPlanRepository)
        {
            this.destinationRepository = destinationRepository;
            this.travelPlanRepository = travelPlanRepository;
        }

        public async Task<ServiceResultDto<DestinationResponseDto>> CreateDestinationAsync(CreateDestinationCommandDto command)
        {
            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(
                    "You do not have permission to add destinations to this travel plan.",
                    403
                );
            }

            var validation = DestinationValidator.ValidateCreate(command, travelPlan);

            if (!validation.IsValid)
            {
                return ServiceResultDto<DestinationResponseDto>.Fail(validation.Message);
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
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<DestinationResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<DestinationResponseDto>>.Fail(
                    "Travel plan id is not valid."
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

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
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
    }
}