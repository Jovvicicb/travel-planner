import { useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useCreateTrip() {
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  async function createTrip(data) {
    try {
      setCreating(true);
      setCreateError("");

      const result = await tripService.createTravelPlan(data);

      return result.data;
    } catch (error) {
      setCreateError(error.message);
      throw error;
    } finally {
      setCreating(false);
    }
  }

  return {
    creating,
    createError,
    createTrip,
  };
}
