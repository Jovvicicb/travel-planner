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

        public async Task<ServiceResultDto<List<TravelPlanListItemDto>>> GetTravelPlansAsync(int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<TravelPlanListItemDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            var plans = isAdmin
                ? await travelPlanRepository.GetAllAsync()
                : await travelPlanRepository.GetByOwnerIdAsync(requestUserId);

            var response = plans
                .Select(TravelPlanMapper.ToListItem)
                .ToList();

            return ServiceResultDto<List<TravelPlanListItemDto>>.Ok(
                response,
                "Travel plans fetched successfully."
            );
        }

        public async Task<ServiceResultDto<TravelPlanResponseDto>> GetTravelPlanByIdAsync(int planId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (planId <= 0)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "Travel plan id is not valid."
                );
            }

            var plan = await travelPlanRepository.GetByIdAsync(planId);

            if (plan == null)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && plan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "You do not have permission to view this travel plan.",
                    403
                );
            }

            return ServiceResultDto<TravelPlanResponseDto>.Ok(
                TravelPlanMapper.ToResponse(plan),
                "Travel plan fetched successfully."
            );
        }

        public async Task<ServiceResultDto<TravelPlanResponseDto>> UpdateTravelPlanAsync(UpdateTravelPlanCommandDto command)
        {
            var validation = TravelPlanValidator.ValidateUpdate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(validation.Message);
            }

            var plan = await travelPlanRepository.GetByIdAsync(command.PlanId);

            if (plan == null)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!command.IsAdmin && plan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<TravelPlanResponseDto>.Fail(
                    "You do not have permission to update this travel plan.",
                    403
                );
            }

            plan.Title = command.Title.Trim();
            plan.Description = command.Description?.Trim();
            plan.StartDate = command.StartDate;
            plan.EndDate = command.EndDate;
            plan.Budget = command.Budget;
            plan.Notes = command.Notes?.Trim();
            plan.UpdatedAt = DateTime.UtcNow;

            await travelPlanRepository.UpdateAsync(plan);

            return ServiceResultDto<TravelPlanResponseDto>.Ok(
                TravelPlanMapper.ToResponse(plan),
                "Travel plan updated successfully."
            );
        }
    }
}