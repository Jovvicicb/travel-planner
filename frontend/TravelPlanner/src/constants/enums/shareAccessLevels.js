export const SHARE_ACCESS_LEVELS = {
  VIEW: 0,
  EDIT: 1,
};

export const SHARE_ACCESS_LEVEL_OPTIONS = [
  {
    value: SHARE_ACCESS_LEVELS.VIEW,
    label: "View",
  },
  {
    value: SHARE_ACCESS_LEVELS.EDIT,
    label: "Edit",
  },
];

export const SHARE_ACCESS_LEVEL_LABELS = {
  [SHARE_ACCESS_LEVELS.VIEW]: "View",
  [SHARE_ACCESS_LEVELS.EDIT]: "Edit",
};

export const SHARE_ACCESS_LEVEL_BADGE_LABELS = {
  [SHARE_ACCESS_LEVELS.VIEW]: "View access",
  [SHARE_ACCESS_LEVELS.EDIT]: "Edit access",
};

export function getShareAccessLevelLabel(accessLevel) {
  return SHARE_ACCESS_LEVEL_LABELS[accessLevel] || "Unknown";
}

export function getShareAccessLevelBadgeLabel(accessLevel) {
  return SHARE_ACCESS_LEVEL_BADGE_LABELS[accessLevel] || "Unknown access";
}

export function canClaimShareEditAccess(accessLevel) {
  return Number(accessLevel) === SHARE_ACCESS_LEVELS.EDIT;
}

export function isValidShareAccessLevel(accessLevel) {
  return Object.prototype.hasOwnProperty.call(
    SHARE_ACCESS_LEVEL_LABELS,
    accessLevel,
  );
}
