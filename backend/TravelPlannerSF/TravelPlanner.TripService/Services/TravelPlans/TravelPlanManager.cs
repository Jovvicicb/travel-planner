using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.TripService.Entities.TravelPlans;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.TravelPlans;
using TravelPlanner.TripService.Mapping.TravelPlans;

namespace TravelPlanner.TripService.Services.TravelPlans
{
    public class TravelPlanManager : ITravelPlanManager
    {
        private readonly ITravelPlanRepository travelPlanRepository;

        public TravelPlanManager(ITravelPlanRepository travelPlanRepository)
        {
            this.travelPlanRepository = travelPlanRepository;
        }

        public async Task<ServiceResultDto<TravelPlanResponseDto>> CreateTravelPlanAsync(CreateTravelPlanCommandDto command)
        {
            var validation = TravelPlanValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(validation.Message);
            }

            var plan = new TravelPlan
            {
                OwnerUserId = command.OwnerUserId,
                Title = command.Title.Trim(),
                Description = command.Description?.Trim(),
                StartDate = command.StartDate,
                EndDate = command.EndDate,
                Budget = command.Budget,
                Notes = command.Notes?.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var createdPlan = await travelPlanRepository.CreateAsync(plan);

            return ServiceResultDto<TravelPlanResponseDto>.Created(
                TravelPlanMapper.ToResponse(createdPlan),
                "Travel plan created successfully."
            );
        }
    }
}