const PENDING_SHARED_TRIP_REDIRECT_KEY = "pendingSharedTripRedirect";

export function savePendingSharedTripRedirect(path) {
  if (!path || !path.startsWith("/")) {
    return;
  }

  sessionStorage.setItem(PENDING_SHARED_TRIP_REDIRECT_KEY, path);
}

export function getPendingSharedTripRedirect() {
  return sessionStorage.getItem(PENDING_SHARED_TRIP_REDIRECT_KEY);
}

export function removePendingSharedTripRedirect() {
  sessionStorage.removeItem(PENDING_SHARED_TRIP_REDIRECT_KEY);
}
