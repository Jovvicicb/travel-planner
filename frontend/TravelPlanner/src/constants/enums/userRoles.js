export const USER_ROLES = {
  USER: 0,
  ADMIN: 1,
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: "User",
  [USER_ROLES.ADMIN]: "Admin",
  user: "User",
  admin: "Admin",
  User: "User",
  Admin: "Admin",
};

export const USER_ROLE_OPTIONS = [
  {
    value: USER_ROLES.USER,
    label: USER_ROLE_LABELS[USER_ROLES.USER],
  },
  {
    value: USER_ROLES.ADMIN,
    label: USER_ROLE_LABELS[USER_ROLES.ADMIN],
  },
];

export function getUserRoleLabel(role) {
  return USER_ROLE_LABELS[role] || "Unknown";
}

export function isAdminRole(role) {
  return role === USER_ROLES.ADMIN || String(role).toLowerCase() === "admin";
}
