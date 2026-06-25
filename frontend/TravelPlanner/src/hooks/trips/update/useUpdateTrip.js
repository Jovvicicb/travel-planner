import { useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useUpdateTrip() {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  async function updateTrip(id, data) {
    try {
      setUpdating(true);
      setUpdateError("");

      const result = await tripService.updateTravelPlan(id, data);

      return result.data;
    } catch (error) {
      setUpdateError(error.message);
      throw error;
    } finally {
      setUpdating(false);
    }
  }

  return {
    updating,
    updateError,
    updateTrip,
  };
}
