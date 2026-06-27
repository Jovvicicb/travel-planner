import { SHARE_ACCESS_LEVELS } from "../../../../constants/enums/shareAccessLevels";

export function createShareFormModel() {
  return {
    accessLevel: String(SHARE_ACCESS_LEVELS.VIEW),
    expiresAt: "",
  };
}
