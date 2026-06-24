import { useEffect, useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripsError, setTripsError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadInitialTrips() {
      try {
        const result = await tripService.getTravelPlans();

        if (!isActive) {
          return;
        }

        setTrips(result.data || []);
        setTripsError("");
      } catch (error) {
        if (isActive) {
          setTripsError(error.message);
        }
      } finally {
        if (isActive) {
          setLoadingTrips(false);
        }
      }
    }

    loadInitialTrips();

    return () => {
      isActive = false;
    };
  }, []);

  async function reloadTrips() {
    try {
      setLoadingTrips(true);
      setTripsError("");

      const result = await tripService.getTravelPlans();

      setTrips(result.data || []);
    } catch (error) {
      setTripsError(error.message);
    } finally {
      setLoadingTrips(false);
    }
  }

  return {
    trips,
    loadingTrips,
    tripsError,
    reloadTrips,
  };
}
