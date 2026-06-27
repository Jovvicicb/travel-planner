const SHARE_ACCESS_LEVEL_LABELS = {
  0: "View",
  1: "Edit",
};

function formatDate(value) {
  if (!value) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function toShareListItemDisplayModel(share) {
  return {
    id: share.id,
    travelPlanId: share.travelPlanId,
    token: share.token,
    shareUrl: share.shareUrl,
    accessLevel: share.accessLevel,
    accessLevelLabel: SHARE_ACCESS_LEVEL_LABELS[share.accessLevel] || "Unknown",
    expiresAt: share.expiresAt,
    expiresAtDisplay: formatDate(share.expiresAt),
    isActive: share.isActive,
    statusLabel: share.isActive ? "Active" : "Inactive",
    createdAt: share.createdAt,
    createdAtDisplay: formatDate(share.createdAt),
  };
}
