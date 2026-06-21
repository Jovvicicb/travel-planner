using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.TripService.Entities.Checklist;
using TravelPlanner.TripService.Mapping.Checklist;
using TravelPlanner.TripService.Repositories.Checklist;
using TravelPlanner.TripService.Repositories.TravelPlans;
using TravelPlanner.TripService.Services.Permissions;
using TravelPlanner.TripService.Validation.Checklist;

namespace TravelPlanner.TripService.Services.Checklist
{
    public class ChecklistManager : IChecklistManager
    {
        private readonly IChecklistRepository checklistRepository;
        private readonly ITravelPlanRepository travelPlanRepository;
        private readonly ITravelPlanPermissionService permissionService;


        public ChecklistManager(
            IChecklistRepository checklistRepository,
            ITravelPlanRepository travelPlanRepository,
            ITravelPlanPermissionService permissionService)
        {
            this.checklistRepository = checklistRepository;
            this.travelPlanRepository = travelPlanRepository;
            this.permissionService = permissionService;
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

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "You do not have permission to add checklist items to this travel plan.",
                    403
                );
            }

            var validation = ChecklistValidator.ValidateCreate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                   validation.Message,
                   validation.StatusCode
                );
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
            var validation = ChecklistValidator.ValidateGet(travelPlanId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<List<ChecklistItemResponseDto>>.Fail(
                    validation.Message,
                    validation.StatusCode
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

            var canView = await permissionService.CanViewAsync(travelPlan, requestUserId, isAdmin);

            if (!canView)
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

            var canEdit = await permissionService.CanEditAsync(travelPlan, command.RequestUserId, command.IsAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "You do not have permission to update this checklist item.",
                    403
                );
            }

            var validation = ChecklistValidator.ValidateUpdate(command);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
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

        public async Task<ServiceResultDto<ChecklistItemResponseDto>> ToggleChecklistItemAsync(int travelPlanId, int itemId, int requestUserId, bool isAdmin)
        {
            var validation = ChecklistValidator.ValidateItemAction(travelPlanId, itemId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var item = await checklistRepository.GetByIdAsync(itemId);

            if (item == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item not found.",
                    404
                );
            }

            if (item.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Checklist item does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var canEdit = await permissionService.CanEditAsync(travelPlan, requestUserId, isAdmin);

            if (!canEdit)
            {
                return ServiceResultDto<ChecklistItemResponseDto>.Fail(
                    "You do not have permission to update this checklist item.",
                    403
                );
            }

            item.IsCompleted = !item.IsCompleted;
            item.UpdatedAt = DateTime.UtcNow;

            await checklistRepository.UpdateAsync(item);

            return ServiceResultDto<ChecklistItemResponseDto>.Ok(
                ChecklistMapper.ToResponse(item),
                "Checklist item status updated successfully."
            );
        }

        public async Task<ServiceResultDto> DeleteChecklistItemAsync(int travelPlanId, int itemId, int requestUserId, bool isAdmin)
        {
            var validation = ChecklistValidator.ValidateItemAction(travelPlanId, itemId, requestUserId);

            if (!validation.IsValid)
            {
                return ServiceResultDto.Fail(
                    validation.Message,
                    validation.StatusCode
                );
            }

            var item = await checklistRepository.GetByIdAsync(itemId);

            if (item == null)
            {
                return ServiceResultDto.Fail("Checklist item not found.", 404);
            }

            if (item.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto.Fail(
                    "Checklist item does not belong to the specified travel plan.",
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
                    "You do not have permission to delete this checklist item.",
                    403
                );
            }

            await checklistRepository.DeleteAsync(item);

            return ServiceResultDto.Ok("Checklist item deleted successfully.");
        }
    }
}