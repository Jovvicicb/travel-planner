using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.TripService.Entities.TravelPlans;
using TravelPlanner.TripService.Mapping.TravelPlans;
using TravelPlanner.TripService.Repositories.Collaborators;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.Permissions;
using TravelPlanner.TripService.Validation.TravelPlans;

namespace TravelPlanner.TripService.Services.TravelPlans
{
    public class TravelPlanManager : ITravelPlanManager
    {
        private readonly ITravelPlanRepository travelPlanRepository;

        private readonly ITravelPlanCollaboratorRepository collaboratorRepository;

        private readonly ITravelPlanPermissionService permissionService;

        public TravelPlanManager(
            ITravelPlanRepository travelPlanRepository,
            ITravelPlanCollaboratorRepository collaboratorRepository,
            ITravelPlanPermissionService permissionService)
        {
            this.travelPlanRepository = travelPlanRepository;
            this.collaboratorRepository = collaboratorRepository;
            this.permissionService = permissionService;
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

            var plans = new List<TravelPlan>();

            if (isAdmin)
            {
                plans = await travelPlanRepository.GetAllAsync();
            }
            else
            {
                var ownerPlans = await travelPlanRepository.GetByOwnerIdAsync(requestUserId);

                var collaboratorPlanIds = await collaboratorRepository.GetTravelPlanIdsByUserIdAsync(requestUserId);

                var collaboratorPlans = collaboratorPlanIds.Count == 0
                    ? new List<TravelPlan>()
                    : await travelPlanRepository.GetByIdsAsync(collaboratorPlanIds);

                plans = ownerPlans
                    .Concat(collaboratorPlans)
                    .GroupBy(plan => plan.Id)
                    .Select(group => group.First())
                    .OrderByDescending(plan => plan.CreatedAt)
                    .ToList();
            }

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

            var canView = await permissionService.CanViewAsync(plan, requestUserId, isAdmin);

            if (!canView)
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

            var canEdit = await permissionService.CanEditAsync(plan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
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

        public async Task<ServiceResultDto> DeleteTravelPlanAsync(int planId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto.Fail("Authenticated user is required.", 401);
            }

            if (planId <= 0)
            {
                return ServiceResultDto.Fail("Travel plan id is not valid.");
            }

            var plan = await travelPlanRepository.GetByIdAsync(planId);

            if (plan == null)
            {
                return ServiceResultDto.Fail("Travel plan not found.", 404);
            }

            var canEdit = await permissionService.CanEditAsync(plan, requestUserId, isAdmin);

            if (!canEdit)
            {
                return ServiceResultDto.Fail(
                    "You do not have permission to delete this travel plan.",
                    403
                );
            }

            await travelPlanRepository.DeleteAsync(plan);

            return ServiceResultDto.Ok("Travel plan deleted successfully.");
        }
    }
}