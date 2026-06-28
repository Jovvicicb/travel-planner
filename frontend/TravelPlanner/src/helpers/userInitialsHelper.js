export function getUserInitials(fullName) {
  if (!fullName) {
    return "U";
  }

  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
