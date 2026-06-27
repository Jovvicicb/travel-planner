import { USER_ROLES } from "../../../constants/enums/userRoles";

const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: "User",
  [USER_ROLES.ADMIN]: "Admin",
  user: "User",
  admin: "Admin",
  User: "User",
  Admin: "Admin",
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

export function toAdminUserDisplayModel(user) {
  const role = user.role;

  return {
    id: user.id,
    fullName: user.fullName || "Unnamed user",
    email: user.email || "No email available",
    role,
    roleLabel: USER_ROLE_LABELS[role] || "Unknown",
    isAdmin: role === USER_ROLES.ADMIN || role === "Admin" || role === "admin",
    isActive: Boolean(user.isActive),
    statusLabel: user.isActive ? "Active" : "Inactive",
    createdAt: user.createdAt,
    createdAtDisplay: formatDate(user.createdAt),
  };
}

export function getNextUserRole(user) {
  const displayUser = toAdminUserDisplayModel(user);

  return displayUser.isAdmin ? USER_ROLES.USER : USER_ROLES.ADMIN;
}

export function getRoleActionLabel(user) {
  const displayUser = toAdminUserDisplayModel(user);

  return displayUser.isAdmin ? "Demote to user" : "Promote to admin";
}
