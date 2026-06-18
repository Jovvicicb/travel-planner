using TravelPlanner.Contracts.DTOs.Trips.Shares;
using TravelPlanner.TripService.Entities.Shares;

namespace TravelPlanner.TripService.Mapping.Shares
{
    public static class TravelPlanShareMapper
    {
        public static TravelPlanShareResponseDto ToResponse(TravelPlanShare share, string shareBaseUrl)
        {
            return new TravelPlanShareResponseDto
            {
                Id = share.Id,
                TravelPlanId = share.TravelPlanId,
                Token = share.Token,
                ShareUrl = $"{shareBaseUrl.TrimEnd('/')}/{share.Token}",
                AccessLevel = share.AccessLevel,
                ExpiresAt = share.ExpiresAt,
                IsActive = share.IsActive,
                CreatedAt = share.CreatedAt
            };
        }
    }
}