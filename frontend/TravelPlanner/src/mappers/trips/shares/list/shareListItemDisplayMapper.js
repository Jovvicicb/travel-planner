import { getShareAccessLevelLabel } from "../../../../constants/enums/shareAccessLevels";
import { formatDisplayDate } from "../../../../helpers/display/displayFormatHelper";

function formatShareExpirationDate(value) {
  if (!value) {
    return "Never";
  }

  return formatDisplayDate(value);
}

export function toShareListItemDisplayModel(share) {
  return {
    id: share.id,
    travelPlanId: share.travelPlanId,
    token: share.token,
    shareUrl: share.shareUrl,
    accessLevel: share.accessLevel,
    accessLevelLabel: getShareAccessLevelLabel(share.accessLevel),
    expiresAt: share.expiresAt,
    expiresAtDisplay: formatShareExpirationDate(share.expiresAt),
    isActive: share.isActive,
    statusLabel: share.isActive ? "Active" : "Inactive",
    createdAt: share.createdAt,
    createdAtDisplay: formatDisplayDate(share.createdAt),
  };
}
