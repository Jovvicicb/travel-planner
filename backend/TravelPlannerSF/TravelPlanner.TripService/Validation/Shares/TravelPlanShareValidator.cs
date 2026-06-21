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
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
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

        public static ValidationResultDto ValidateToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return ValidationResultDto.Fail("Share token is required.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateGetShares(int travelPlanId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateDeactivate(int travelPlanId, int shareId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (shareId <= 0)
            {
                return ValidationResultDto.Fail("Share link id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateClaim(string token, int requestUserId)
        {
            var tokenValidation = ValidateToken(token);

            if (!tokenValidation.IsValid)
            {
                return tokenValidation;
            }

            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateCollaborators(int travelPlanId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            return ValidationResultDto.Success();
        }

        public static ValidationResultDto ValidateRemoveCollaborator(int travelPlanId, int collaboratorUserId, int requestUserId)
        {
            if (requestUserId <= 0)
            {
                return ValidationResultDto.Fail("Authenticated user is required.", 401);
            }

            if (travelPlanId <= 0)
            {
                return ValidationResultDto.Fail("Travel plan id is not valid.");
            }

            if (collaboratorUserId <= 0)
            {
                return ValidationResultDto.Fail("Collaborator user id is not valid.");
            }

            return ValidationResultDto.Success();
        }
    }
}