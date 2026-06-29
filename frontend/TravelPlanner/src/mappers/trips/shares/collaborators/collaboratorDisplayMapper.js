import { getShareAccessLevelLabel } from "../../../../constants/enums/shareAccessLevels";
import { formatDisplayDate } from "../../../../helpers/display/displayFormatHelper";

export function toCollaboratorDisplayModel(collaborator) {
  return {
    travelPlanId: collaborator.travelPlanId,
    userId: collaborator.userId,
    fullName: collaborator.fullName || `User #${collaborator.userId}`,
    email: collaborator.email || "No email available",
    accessLevel: collaborator.accessLevel,
    accessLevelLabel: getShareAccessLevelLabel(collaborator.accessLevel),
    createdAt: collaborator.createdAt,
    createdAtDisplay: formatDisplayDate(collaborator.createdAt),
  };
}
