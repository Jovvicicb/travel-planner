const SHARE_ACCESS_LEVEL_LABELS = {
  0: "View",
  1: "Edit",
};

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function toCollaboratorDisplayModel(collaborator) {
  return {
    travelPlanId: collaborator.travelPlanId,
    userId: collaborator.userId,
    fullName: collaborator.fullName || `User #${collaborator.userId}`,
    email: collaborator.email || "No email available",
    accessLevel: collaborator.accessLevel,
    accessLevelLabel:
      SHARE_ACCESS_LEVEL_LABELS[collaborator.accessLevel] || "Unknown",
    createdAt: collaborator.createdAt,
    createdAtDisplay: formatDate(collaborator.createdAt),
  };
}
