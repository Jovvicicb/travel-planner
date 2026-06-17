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
    }
}