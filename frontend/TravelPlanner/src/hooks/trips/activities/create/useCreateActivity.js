import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCreateActivity() {
  const [creatingActivity, setCreatingActivity] = useState(false);
  const [createActivityError, setCreateActivityError] = useState("");

  async function createActivity(tripId, destinationId, data) {
    try {
      setCreatingActivity(true);
      setCreateActivityError("");

      const result = await tripService.createActivity(
        tripId,
        destinationId,
        data,
      );

      return result.data;
    } catch (error) {
      setCreateActivityError(error.message);
      throw error;
    } finally {
      setCreatingActivity(false);
    }
  }

  return {
    creatingActivity,
    createActivityError,
    createActivity,
  };
}
