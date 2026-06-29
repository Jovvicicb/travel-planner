import {
  USER_ROLES,
  getUserRoleLabel,
  isAdminRole,
} from "../../../constants/enums/userRoles";
import { formatDisplayDate } from "../../../helpers/display/displayFormatHelper";

export function toAdminUserDisplayModel(user) {
  const role = user.role;
  const isAdmin = isAdminRole(role);

  return {
    id: user.id,
    fullName: user.fullName || "Unnamed user",
    email: user.email || "No email available",
    role,
    roleLabel: getUserRoleLabel(role),
    isAdmin,
    isActive: Boolean(user.isActive),
    statusLabel: user.isActive ? "Active" : "Inactive",
    createdAt: user.createdAt,
    createdAtDisplay: formatDisplayDate(user.createdAt),
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
