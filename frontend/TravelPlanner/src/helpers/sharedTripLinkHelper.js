export function extractSharedTripToken(value) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return "";
  }

  const sharedPathPart = "/shared/trips/";

  if (trimmedValue.includes(sharedPathPart)) {
    const tokenPart = trimmedValue.split(sharedPathPart)[1];

    return tokenPart?.split("?")[0]?.split("#")[0]?.trim() || "";
  }

  return trimmedValue;
}

export function createSharedTripPath(token) {
  return `/shared/trips/${encodeURIComponent(token)}`;
}
