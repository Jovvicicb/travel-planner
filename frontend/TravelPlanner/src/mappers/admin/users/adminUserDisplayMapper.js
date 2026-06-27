const USER_ROLE_LABELS = {
  0: "User",
  1: "Admin",
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
  return {
    id: user.id,
    fullName: user.fullName || "Unnamed user",
    email: user.email || "No email available",
    role: user.role,
    roleLabel: USER_ROLE_LABELS[user.role] || "Unknown",
    isActive: Boolean(user.isActive),
    statusLabel: user.isActive ? "Active" : "Inactive",
    createdAt: user.createdAt,
    createdAtDisplay: formatDate(user.createdAt),
  };
}
