using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Activities;
using TravelPlanner.Contracts.DTOs.Trips.Checklist;
using TravelPlanner.Contracts.DTOs.Trips.Destinations;
using TravelPlanner.Contracts.DTOs.Trips.Expenses;
using TravelPlanner.Contracts.DTOs.Trips.TravelPlans;
using TravelPlanner.Contracts.Interfaces.Trips;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/trips")]
    public class TripsController : ControllerBase
    {
        private readonly ITripService tripService;

        public TripsController()
        {
            tripService = ServiceProxy.Create<ITripService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.TripService")
            );
        }

        //TravelPlan
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTravelPlanRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateTravelPlanCommandDto
            {
                OwnerUserId = userContext.Value.UserId,
                Title = request.Title,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Budget = request.Budget,
                Notes = request.Notes
            };

            var result = await tripService.CreateTravelPlanAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetTravelPlansAsync(
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetTravelPlanByIdAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTravelPlanRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateTravelPlanCommandDto
            {
                PlanId = id,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Budget = request.Budget,
                Notes = request.Notes
            };

            var result = await tripService.UpdateTravelPlanAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteTravelPlanAsync(
                id,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }


        //Destination
        [HttpPost("{tripId:int}/destinations")]
        public async Task<IActionResult> CreateDestination(int tripId, [FromBody] CreateDestinationRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateDestinationCommandDto
            {
                TravelPlanId = tripId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Name = request.Name,
                Location = request.Location,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Notes = request.Notes
            };

            var result = await tripService.CreateDestinationAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/destinations")]
        public async Task<IActionResult> GetDestinations(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetDestinationsAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{tripId:int}/destinations/{destinationId:int}")]
        public async Task<IActionResult> UpdateDestination(int tripId, int destinationId, [FromBody] UpdateDestinationRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateDestinationCommandDto
            {
                TravelPlanId = tripId,
                DestinationId = destinationId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Name = request.Name,
                Location = request.Location,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Notes = request.Notes
            };

            var result = await tripService.UpdateDestinationAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{tripId:int}/destinations/{destinationId:int}")]
        public async Task<IActionResult> DeleteDestination(int tripId, int destinationId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteDestinationAsync(
                tripId,
                destinationId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }


        //Activity
        [HttpPost("{tripId:int}/destinations/{destinationId:int}/activities")]
        public async Task<IActionResult> CreateActivity(int tripId, int destinationId, [FromBody] CreateActivityRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateActivityCommandDto
            {
                TravelPlanId = tripId,
                DestinationId = destinationId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                ActivityDate = request.ActivityDate,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Location = request.Location,
                Description = request.Description,
                EstimatedCost = request.EstimatedCost,
                Status = request.Status
            };

            var result = await tripService.CreateActivityAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/destinations/{destinationId:int}/activities")]
        public async Task<IActionResult> GetActivities(int tripId, int destinationId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetActivitiesAsync(
                tripId,
                destinationId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/activities/calendar")]
        public async Task<IActionResult> GetActivityCalendar(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetActivityCalendarAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{tripId:int}/destinations/{destinationId:int}/activities/{activityId:int}")]
        public async Task<IActionResult> UpdateActivity(int tripId, int destinationId, int activityId, [FromBody] UpdateActivityRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateActivityCommandDto
            {
                TravelPlanId = tripId,
                DestinationId = destinationId,
                ActivityId = activityId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                ActivityDate = request.ActivityDate,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Location = request.Location,
                Description = request.Description,
                EstimatedCost = request.EstimatedCost,
                Status = request.Status
            };

            var result = await tripService.UpdateActivityAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{tripId:int}/destinations/{destinationId:int}/activities/{activityId:int}")]
        public async Task<IActionResult> DeleteActivity(int tripId, int destinationId, int activityId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteActivityAsync(
                tripId,
                destinationId,
                activityId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }


        //Expense
        [HttpPost("{tripId:int}/expenses")]
        public async Task<IActionResult> CreateExpense(int tripId, [FromBody] CreateExpenseRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateExpenseCommandDto
            {
                TravelPlanId = tripId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Category = request.Category,
                Amount = request.Amount,
                ExpenseDate = request.ExpenseDate,
                Description = request.Description
            };

            var result = await tripService.CreateExpenseAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/expenses")]
        public async Task<IActionResult> GetExpenses(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetExpensesAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{tripId:int}/expenses/{expenseId:int}")]
        public async Task<IActionResult> UpdateExpense(int tripId, int expenseId, [FromBody] UpdateExpenseRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateExpenseCommandDto
            {
                TravelPlanId = tripId,
                ExpenseId = expenseId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                Category = request.Category,
                Amount = request.Amount,
                ExpenseDate = request.ExpenseDate,
                Description = request.Description
            };

            var result = await tripService.UpdateExpenseAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{tripId:int}/expenses/{expenseId:int}")]
        public async Task<IActionResult> DeleteExpense(int tripId, int expenseId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteExpenseAsync(
                tripId,
                expenseId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/budget-summary")]
        public async Task<IActionResult> GetBudgetSummary(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetBudgetSummaryAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }


        //Checklist
        [HttpPost("{tripId:int}/checklist")]
        public async Task<IActionResult> CreateChecklistItem(int tripId, [FromBody] CreateChecklistItemRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new CreateChecklistItemCommandDto
            {
                TravelPlanId = tripId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title
            };

            var result = await tripService.CreateChecklistItemAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{tripId:int}/checklist")]
        public async Task<IActionResult> GetChecklistItems(int tripId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.GetChecklistItemsAsync(
                tripId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpPut("{tripId:int}/checklist/{itemId:int}")]
        public async Task<IActionResult> UpdateChecklistItem(int tripId, int itemId, [FromBody] UpdateChecklistItemRequestDto request)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var command = new UpdateChecklistItemCommandDto
            {
                TravelPlanId = tripId,
                ItemId = itemId,
                RequestUserId = userContext.Value.UserId,
                IsAdmin = userContext.Value.IsAdmin,
                Title = request.Title,
                IsCompleted = request.IsCompleted
            };

            var result = await tripService.UpdateChecklistItemAsync(command);

            return ResponseHelper.Send(this, result);
        }

        [HttpPatch("{tripId:int}/checklist/{itemId:int}/toggle")]
        public async Task<IActionResult> ToggleChecklistItem(int tripId, int itemId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.ToggleChecklistItemAsync(
                tripId,
                itemId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }

        [HttpDelete("{tripId:int}/checklist/{itemId:int}")]
        public async Task<IActionResult> DeleteChecklistItem(int tripId, int itemId)
        {
            var userContext = UserContextHelper.GetUserContext(User);

            if (userContext == null)
            {
                return ResponseHelper.Send(
                    this,
                    ServiceResultDto.Fail("Invalid authentication token.", 401)
                );
            }

            var result = await tripService.DeleteChecklistItemAsync(
                tripId,
                itemId,
                userContext.Value.UserId,
                userContext.Value.IsAdmin
            );

            return ResponseHelper.Send(this, result);
        }
    }
}