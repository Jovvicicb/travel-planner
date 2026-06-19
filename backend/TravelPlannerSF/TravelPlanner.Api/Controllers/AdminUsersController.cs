using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using TravelPlanner.Api.Helpers;
using TravelPlanner.Contracts.Enums;
using TravelPlanner.Contracts.Interfaces;

namespace TravelPlanner.Api.Controllers
{
    [ApiController]
    [Authorize(Roles = nameof(UserRole.Admin))]
    [Route("api/admin/users")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IAuthService authService;

        public AdminUsersController()
        {
            authService = ServiceProxy.Create<IAuthService>(
                new Uri("fabric:/TravelPlannerSF/TravelPlanner.AuthService")
            );
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var result = await authService.GetUsersAsync();

            return ResponseHelper.Send(this, result);
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var result = await authService.GetUserByIdAsync(userId);

            return ResponseHelper.Send(this, result);
        }
    }
}