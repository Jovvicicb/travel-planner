import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useDeleteActivity() {
  const [deletingActivity, setDeletingActivity] = useState(false);
  const [deleteActivityError, setDeleteActivityError] = useState("");

  async function deleteActivity(tripId, destinationId, activityId) {
    if (!tripId || Number(tripId) <= 0) {
      setDeleteActivityError("Travel plan id is not valid.");
      return;
    }

    if (!destinationId || Number(destinationId) <= 0) {
      setDeleteActivityError("Destination id is not valid.");
      return;
    }

    if (!activityId || Number(activityId) <= 0) {
      setDeleteActivityError("Activity id is not valid.");
      return;
    }

    try {
      setDeletingActivity(true);
      setDeleteActivityError("");

      await tripService.deleteActivity(tripId, destinationId, activityId);
    } catch (error) {
      setDeleteActivityError(error.message);
      throw error;
    } finally {
      setDeletingActivity(false);
    }
  }

  return {
    deletingActivity,
    deleteActivityError,
    deleteActivity,
  };
}
