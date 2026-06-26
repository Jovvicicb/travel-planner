import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useUpdateActivity() {
  const [updatingActivity, setUpdatingActivity] = useState(false);
  const [updateActivityError, setUpdateActivityError] = useState("");

  async function updateActivity(tripId, destinationId, activityId, data) {
    try {
      setUpdatingActivity(true);
      setUpdateActivityError("");

      const result = await tripService.updateActivity(
        tripId,
        destinationId,
        activityId,
        data,
      );

      return result.data;
    } catch (error) {
      setUpdateActivityError(error.message);
      throw error;
    } finally {
      setUpdatingActivity(false);
    }
  }

  return {
    updatingActivity,
    updateActivityError,
    updateActivity,
  };
}
