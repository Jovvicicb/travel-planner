using TravelPlanner.Contracts.DTOs.Common;
using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.Contracts.Enums;

namespace TravelPlanner.TripService.Validation.Shares
{
    public static class TravelPlanShareValidator
    {
        public static ValidationResultDto ValidateCreate(CreateTravelPlanShareCommandDto command)
        {
            if (command == null)
            {
                return ValidationResultDto.Fail("Share data is required.");
            }

            if (command.TravelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (command.RequestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.");
            }

            if (!Enum.IsDefined(typeof(ShareAccessLevel), command.AccessLevel))
            {
                return ValidationResultDto.Fail("Share access level is not valid.");
            }

            if (command.ExpiresAt.HasValue &&
                command.ExpiresAt.Value <= DateTime.UtcNow)
            {
                return ValidationResultDto.Fail("Share expiration date must be in the future.");
            }

            return ValidationResultDto.Success();
        }
    }
}