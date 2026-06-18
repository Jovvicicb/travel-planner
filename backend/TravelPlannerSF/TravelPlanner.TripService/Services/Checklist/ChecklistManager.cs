using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.TripService.Entities.Checklist;
using TravelPlanner.TripService.Mapping.Checklist;
using TravelPlanner.TripService.Repositories.Checklist;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Validation.Checklist;

namespace TravelPlanner.TripService.Services.Checklist
{
    public class ChecklistManager : IChecklistManager
    {
        private readonly IChecklistRepository checklistRepository;
        private readonly ITravelPlanRepository travelPlanRepository;

        public ChecklistManager(
            IChecklistRepository checklistRepository,
            ITravelPlanRepository travelPlanRepository)
        {
            this.checklistRepository = checklistRepository;
            this.travelPlanRepository = travelPlanRepository;
        }

        public async Task<ServiceResultDto<ChecklistItemResponseDto>> CreateChecklistItemAsync(CreateChecklistItemCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item data is required."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "You do not have permission to add checklist items to this travel plan.",
                    403
                );
            }

            var validation = ChecklistValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(validation.Message);
            }

            var item = new ChecklistItem
            {
                TravelPlanId = command.TravelPlanId,
                Title = command.Title.Trim(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            var createdItem = await checklistRepository.CreateAsync(item);

            return ServiceResultDto<ChecklistItemResponseDto>.Created(
                ChecklistMapper.ToResponse(createdItem),
                "Checklist item created successfully."
            );
        }

        public async Task<ServiceResultDto<List<ChecklistItemResponseDto>>> GetChecklistItemsAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<ChecklistItemResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<ChecklistItemResponseDto>>.Fail(
                    "Travel plan id is not valid."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<ChecklistItemResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<List<ChecklistItemResponseDto>>.Fail(
                    "You do not have permission to view checklist items for this travel plan.",
                    403
                );
            }

            var items = await checklistRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = items
                .Select(ChecklistMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<ChecklistItemResponseDto>>.Ok(
                response,
                "Checklist items fetched successfully."
            );
        }

        public async Task<ServiceResultDto<ChecklistItemResponseDto>> UpdateChecklistItemAsync(UpdateChecklistItemCommandDto command)
        {
            if (command == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item data is required."
                );
            }

            var item = await checklistRepository.GetByIdAsync(command.ItemId);

            if (item == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item not found.",
                    404
                );
            }

            if (item.TravelPlanId != command.TravelPlanId)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(command.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!command.IsAdmin && travelPlan.OwnerUserId != command.RequestUserId)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "You do not have permission to update this checklist item.",
                    403
                );
            }

            var validation = ChecklistValidator.ValidateUpdate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(validation.Message);
            }

            item.Title = command.Title.Trim();
            item.IsCompleted = command.IsCompleted;
            item.UpdatedAt = DateTime.UtcNow;

            await checklistRepository.UpdateAsync(item);

            return ServiceResultDto<ChecklistItemResponseDto>.Ok(
                ChecklistMapper.ToResponse(item),
                "Checklist item updated successfully."
            );
        }
    }
}