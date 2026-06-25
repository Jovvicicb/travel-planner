import { useEffect, useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useTripDetails(tripId) {
  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripError, setTripError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadTripDetails() {
      if (!tripId || Number(tripId) <= 0) {
        setTripError("Travel plan id is not valid.");
        setLoadingTrip(false);
        return;
      }

      try {
        const result = await tripService.getTravelPlanById(tripId);

        if (!isActive) {
          return;
        }

        setTrip(result.data);
        setTripError("");
      } catch (error) {
        if (isActive) {
          setTripError(error.message);
        }
      } finally {
        if (isActive) {
          setLoadingTrip(false);
        }
      }
    }

    loadTripDetails();

    return () => {
      isActive = false;
    };
  }, [tripId]);

  return {
    trip,
    loadingTrip,
    tripError,
  };
}
