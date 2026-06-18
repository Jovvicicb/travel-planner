using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.TripService.Entities.Shares;
using TravelPlanner.TripService.Helpers;
using TravelPlanner.TripService.Mapping.Shares;
using TravelPlanner.TripService.Repositories.Shares;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.Shares;

namespace TravelPlanner.TripService.Services.Shares
{
    public class TravelPlanShareManager : ITravelPlanShareManager
    {
        private const string ShareBaseUrl = "http://localhost:5173/shared/trips";

        private readonly ITravelPlanRepository travelPlanRepository;
        private readonly ITravelPlanShareRepository shareRepository;

        public TravelPlanShareManager(
            ITravelPlanRepository travelPlanRepository,
            ITravelPlanShareRepository shareRepository)
        {
            this.travelPlanRepository = travelPlanRepository;
            this.shareRepository = shareRepository;
        }

        public async Task<ServiceResultDto<TravelPlanShareResponseDto>> CreateShareAsync(CreateTravelPlanShareCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<TravelPlanShareResponseDto>.Fail(
                    "Share data is required."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<TravelPlanShareResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<TravelPlanShareResponseDto>.Fail(
                    "You do not have permission to share this travel plan.",
                    403
                );
            }

            var validation = TravelPlanShareValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<TravelPlanShareResponseDto>.Fail(validation.Message);
            }

            var share = new TravelPlanShare
            {
                TravelPlanId = command.TravelPlanId,
                Token = ShareTokenGenerator.Generate(),
                AccessLevel = command.AccessLevel,
                ExpiresAt = command.ExpiresAt,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            var createdShare = await shareRepository.CreateAsync(share);

            return ServiceResultDto<TravelPlanShareResponseDto>.Created(
                TravelPlanShareMapper.ToResponse(createdShare, ShareBaseUrl),
                "Travel plan share link created successfully."
            );
        }
    }
}