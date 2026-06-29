import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SharedActivityCalendarSection } from "../../components/sharedTrips/details/SharedActivityCalendarSection";
import { SharedBudgetSummary } from "../../components/sharedTrips/details/SharedBudgetSummary";
import { SharedChecklistSection } from "../../components/sharedTrips/details/SharedChecklistSection";
import { SharedDestinationsSection } from "../../components/sharedTrips/details/SharedDestinationsSection";
import { SharedExpensesSection } from "../../components/sharedTrips/details/SharedExpensesSection";
import { SharedTripHeader } from "../../components/sharedTrips/details/SharedTripHeader";
import { SharedTripHero } from "../../components/sharedTrips/details/SharedTripHero";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SuccessBox } from "../../components/ui/SuccessBox";
import { savePendingSharedTripRedirect } from "../../helpers/sharedTripRedirectHelper";
import { hasAccessToken } from "../../helpers/tokenHelper";
import { useSharedTravelPlan } from "../../hooks/sharedTrips/details/useSharedTravelPlan";
import { useClaimShare } from "../../hooks/trips/shares/claim/useClaimShare";

const CLAIM_REDIRECT_DELAY_MS = 900;

const statusSectionClassName =
  "rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5";

export function SharedTripPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState("");

  const { sharedTrip, loadingSharedTrip, sharedTripError } =
    useSharedTravelPlan(token);

  const { claimingShare, claimShareError, claimShare } = useClaimShare();

  async function handleClaimEditAccess() {
    if (!token) {
      return;
    }

    const redirectPath = `${location.pathname}${location.search}`;

    if (!hasAccessToken()) {
      savePendingSharedTripRedirect(redirectPath);
      navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);

      return;
    }

    const result = await claimShare(token);

    if (!result) {
      return;
    }

    if (result.alreadyHadAccess) {
      setSuccessMessage(
        "You already have edit access to this travel plan. Redirecting...",
      );
    } else {
      setSuccessMessage(
        "Edit access claimed successfully. Redirecting to travel plan...",
      );
    }

    setTimeout(() => {
      navigate(`/trips/${result.travelPlanId}`);
    }, CLAIM_REDIRECT_DELAY_MS);
  }

  return (
    <main className="min-h-screen bg-[#eee6dc] px-6 py-6 text-[#2f2924] lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <SharedTripHeader />

        {loadingSharedTrip && (
          <section className={statusSectionClassName}>
            <LoadingState message="Loading shared travel plan..." />
          </section>
        )}

        {!loadingSharedTrip && sharedTripError && (
          <section className={statusSectionClassName}>
            <ErrorBox message={sharedTripError} />
          </section>
        )}

        {!loadingSharedTrip && !sharedTripError && sharedTrip && (
          <>
            {successMessage && <SuccessBox message={successMessage} />}

            {claimShareError && <ErrorBox message={claimShareError} />}

            <SharedTripHero
              sharedTrip={sharedTrip}
              claiming={claimingShare}
              onClaimEditAccess={handleClaimEditAccess}
            />

            <SharedBudgetSummary sharedTrip={sharedTrip} />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-6">
                <SharedDestinationsSection
                  destinations={sharedTrip.destinations || []}
                />

                <SharedActivityCalendarSection
                  activityCalendar={sharedTrip.activityCalendar || []}
                />
              </div>

              <div className="grid gap-6">
                <SharedExpensesSection expenses={sharedTrip.expenses || []} />

                <SharedChecklistSection
                  checklistItems={sharedTrip.checklistItems || []}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
