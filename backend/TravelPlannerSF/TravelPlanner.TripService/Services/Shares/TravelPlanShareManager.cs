using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities.Calendar;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.TripService.Entities.Collaborators;
using TravelPlanner.TripService.Entities.Shares;
using TravelPlanner.TripService.Helpers;
using TravelPlanner.TripService.Mapping.Activities;
using TravelPlanner.TripService.Mapping.Checklist;
using TravelPlanner.TripService.Mapping.Destinations;
using TravelPlanner.TripService.Mapping.Expenses;
using TravelPlanner.TripService.Mapping.Shares;
using TravelPlanner.TripService.Mapping.TravelPlans;
using TravelPlanner.TripService.Repositories.Activities;
using TravelPlanner.TripService.Repositories.Checklist;
using TravelPlanner.TripService.Repositories.Collaborators;
using TravelPlanner.TripService.Repositories.Destinations;
using TravelPlanner.TripService.Repositories.Expenses;
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
        private readonly IDestinationRepository destinationRepository;
        private readonly IActivityRepository activityRepository;
        private readonly IExpenseRepository expenseRepository;
        private readonly IChecklistRepository checklistRepository;
        private readonly ITravelPlanCollaboratorRepository collaboratorRepository;

        public TravelPlanShareManager(
            ITravelPlanRepository travelPlanRepository,
            ITravelPlanShareRepository shareRepository,
            IDestinationRepository destinationRepository,
            IActivityRepository activityRepository,
            IExpenseRepository expenseRepository,
            IChecklistRepository checklistRepository,
            ITravelPlanCollaboratorRepository collaboratorRepository)
        {
            this.travelPlanRepository = travelPlanRepository;
            this.shareRepository = shareRepository;
            this.destinationRepository = destinationRepository;
            this.activityRepository = activityRepository;
            this.expenseRepository = expenseRepository;
            this.checklistRepository = checklistRepository;
            this.collaboratorRepository = collaboratorRepository;
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

        public async Task<ServiceResultDto<SharedTravelPlanViewDto>> GetSharedTravelPlanAsync(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return ServiceResultDto<SharedTravelPlanViewDto>.Fail("Share token is required.");
            }

            var share = await shareRepository.GetByTokenAsync(token.Trim());

            if (share == null || !share.IsActive)
            {
                return ServiceResultDto<SharedTravelPlanViewDto>.Fail(
                    "Share link is not valid.",
                    404
                );
            }

            if (share.ExpiresAt.HasValue && share.ExpiresAt.Value <= DateTime.UtcNow)
            {
                return ServiceResultDto<SharedTravelPlanViewDto>.Fail(
                    "Share link has expired.",
                    410
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(share.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<SharedTravelPlanViewDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            var destinations = await destinationRepository.GetByTravelPlanIdAsync(travelPlan.Id);
            var activities = await activityRepository.GetByTravelPlanIdAsync(travelPlan.Id);
            var expenses = await expenseRepository.GetByTravelPlanIdAsync(travelPlan.Id);
            var checklistItems = await checklistRepository.GetByTravelPlanIdAsync(travelPlan.Id);
            var totalExpenses = await expenseRepository.GetTotalAmountByTravelPlanIdAsync(travelPlan.Id);

            var calendar = activities
                .GroupBy(activity => activity.ActivityDate.Date)
                .OrderBy(group => group.Key)
                .Select(group => new CalendarDayDto
                {
                    Date = group.Key,
                    Activities = group
                        .OrderBy(activity => activity.StartTime)
                        .Select(ActivityMapper.ToResponse)
                        .ToList()
                })
                .ToList();

            var budgetSummary = new BudgetSummaryDto
            {
                TravelPlanId = travelPlan.Id,
                PlannedBudget = travelPlan.Budget,
                TotalExpenses = totalExpenses,
                RemainingBudget = travelPlan.Budget - totalExpenses,
                IsOverBudget = totalExpenses > travelPlan.Budget
            };

            var response = new SharedTravelPlanViewDto
            {
                AccessLevel = share.AccessLevel,
                TravelPlan = TravelPlanMapper.ToResponse(travelPlan),
                Destinations = destinations.Select(DestinationMapper.ToResponse).ToList(),
                ActivityCalendar = calendar,
                Expenses = expenses.Select(ExpenseMapper.ToResponse).ToList(),
                BudgetSummary = budgetSummary,
                ChecklistItems = checklistItems.Select(ChecklistMapper.ToResponse).ToList()
            };

            return ServiceResultDto<SharedTravelPlanViewDto>.Ok(
                response,
                "Shared travel plan fetched successfully."
            );
        }

        public async Task<ServiceResultDto<List<TravelPlanShareResponseDto>>> GetSharesAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<TravelPlanShareResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<TravelPlanShareResponseDto>>.Fail(
                    "Travel plan id is not valid."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<TravelPlanShareResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<List<TravelPlanShareResponseDto>>.Fail(
                    "You do not have permission to view share links for this travel plan.",
                    403
                );
            }

            var shares = await shareRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = shares
                .Select(share => TravelPlanShareMapper.ToResponse(share, ShareBaseUrl))
                .ToList();

            return ServiceResultDto<List<TravelPlanShareResponseDto>>.Ok(
                response,
                "Share links fetched successfully."
            );
        }

        public async Task<ServiceResultDto> DeactivateShareAsync(int travelPlanId,int shareId,int requestUserId,bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto.Fail("Travel plan id is not valid.");
            }

            if (shareId <= 0)
            {
                return ServiceResultDto.Fail("Share link id is not valid.");
            }

            var share = await shareRepository.GetByIdAsync(shareId);

            if (share == null)
            {
                return ServiceResultDto.Fail("Share link not found.", 404);
            }

            if (share.TravelPlanId != travelPlanId)
            {
                return ServiceResultDto.Fail(
                    "Share link does not belong to the specified travel plan.",
                    400
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto.Fail("Travel plan not found.", 404);
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto.Fail(
                    "You do not have permission to deactivate this share link.",
                    403
                );
            }

            share.IsActive = false;

            await shareRepository.UpdateAsync(share);

            return ServiceResultDto.Ok("Share link deactivated successfully.");
        }

        public async Task<ServiceResultDto<ClaimShareResponseDto>> ClaimEditShareAsync(string token, int requestUserId)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail("Share token is required.");
            }

            if (requestUserId <= 0)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            var share = await shareRepository.GetByTokenAsync(token.Trim());

            if (share == null || !share.IsActive)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail(
                    "Share link is not valid.",
                    404
                );
            }

            if (share.ExpiresAt.HasValue && share.ExpiresAt.Value <= DateTime.UtcNow)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail(
                    "Share link has expired.",
                    410
                );
            }

            if (share.AccessLevel != ShareAccessLevel.Edit)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail(
                    "This share link does not allow edit access.",
                    403
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(share.TravelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (travelPlan.OwnerUserId == requestUserId)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Ok(
                    new ClaimShareResponseDto
                    {
                        TravelPlanId = travelPlan.Id,
                        UserId = requestUserId,
                        AccessLevel = ShareAccessLevel.Edit,
                        AlreadyHadAccess = true
                    },
                    "You already own this travel plan."
                );
            }

            var existingCollaborator = await collaboratorRepository.GetByPlanAndUserAsync(
                travelPlan.Id,
                requestUserId
            );

            if (existingCollaborator != null)
            {
                return ServiceResultDto<ClaimShareResponseDto>.Ok(
                    new ClaimShareResponseDto
                    {
                        TravelPlanId = travelPlan.Id,
                        UserId = requestUserId,
                        AccessLevel = existingCollaborator.AccessLevel,
                        AlreadyHadAccess = true
                    },
                    "You already have edit access to this travel plan."
                );
            }

            var collaborator = new TravelPlanCollaborator
            {
                TravelPlanId = travelPlan.Id,
                UserId = requestUserId,
                AccessLevel = ShareAccessLevel.Edit,
                CreatedAt = DateTime.UtcNow
            };

            var createdCollaborator = await collaboratorRepository.CreateAsync(collaborator);

            return ServiceResultDto<ClaimShareResponseDto>.Created(
                new ClaimShareResponseDto
                {
                    TravelPlanId = createdCollaborator.TravelPlanId,
                    UserId = createdCollaborator.UserId,
                    AccessLevel = createdCollaborator.AccessLevel,
                    AlreadyHadAccess = false
                },
                "Edit access claimed successfully."
            );
        }

        public async Task<ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>> GetCollaboratorsAsync(int travelPlanId, int requestUserId, bool isAdmin)
        {
            if (requestUserId <= 0)
            {
                return ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>.Fail(
                    "Authenticated user is required.",
                    401
                );
            }

            if (travelPlanId <= 0)
            {
                return ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>.Fail(
                    "Travel plan id is not valid."
                );
            }

            var travelPlan = await travelPlanRepository.GetByIdAsync(travelPlanId);

            if (travelPlan == null)
            {
                return ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>.Fail(
                    "Travel plan not found.",
                    404
                );
            }

            if (!isAdmin && travelPlan.OwnerUserId != requestUserId)
            {
                return ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>.Fail(
                    "You do not have permission to view collaborators for this travel plan.",
                    403
                );
            }

            var collaborators = await collaboratorRepository.GetByTravelPlanIdAsync(travelPlanId);

            var response = collaborators
                .Select(TravelPlanCollaboratorMapper.ToResponse)
                .ToList();

            return ServiceResultDto<List<TravelPlanCollaboratorResponseDto>>.Ok(
                response,
                "Collaborators fetched successfully."
            );
        }
    }
}