import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { TripDetailsTabs } from "../../components/trips/details/tabs/TripDetailsTabs";
import { Button } from "../../components/ui/Button";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useDownloadTripReport } from "../../hooks/reports/useDownloadTripReport";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

const REPORT_ERROR_TIMEOUT_MS = 3000;

export function TripDetailsPage() {
  const { tripId } = useParams();
  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const {
    downloadingReport,
    downloadReportError,
    downloadTripReport,
    clearDownloadReportError,
  } = useDownloadTripReport();

  useEffect(() => {
    if (!downloadReportError) {
      return;
    }

    const timeoutId = setTimeout(() => {
      clearDownloadReportError();
    }, REPORT_ERROR_TIMEOUT_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [downloadReportError, clearDownloadReportError]);

  function handleDownloadReport() {
    if (!tripId) {
      return;
    }

    downloadTripReport(tripId);
  }

  return (
    <>
      <AppHeader
        title={trip?.title || "Travel plan details"}
        description={
          trip
            ? "View and organize all information related to this travel plan."
            : "Loading travel plan information."
        }
        backTo="/trips"
        backLabel="Back to travel plans"
        action={
          trip ? (
            <Button
              type="button"
              size="sm"
              disabled={downloadingReport}
              onClick={handleDownloadReport}
            >
              {downloadingReport ? "Downloading..." : "Download report"}
            </Button>
          ) : null
        }
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        {downloadReportError && (
          <div className="mb-5">
            <ErrorBox message={downloadReportError} />
          </div>
        )}

        {loadingTrip && <LoadingState message="Loading travel plan..." />}

        {!loadingTrip && tripError && <ErrorBox message={tripError} />}

        {!loadingTrip && !tripError && trip && <TripDetailsTabs trip={trip} />}
      </main>
    </>
  );
}
