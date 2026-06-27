import { useParams } from "react-router-dom";
import { SharedActivityCalendarSection } from "../../components/sharedTrips/details/SharedActivityCalendarSection";
import { SharedBudgetSummary } from "../../components/sharedTrips/details/SharedBudgetSummary";
import { SharedChecklistSection } from "../../components/sharedTrips/details/SharedChecklistSection";
import { SharedDestinationsSection } from "../../components/sharedTrips/details/SharedDestinationsSection";
import { SharedExpensesSection } from "../../components/sharedTrips/details/SharedExpensesSection";
import { SharedTripHeader } from "../../components/sharedTrips/details/SharedTripHeader";
import { SharedTripHero } from "../../components/sharedTrips/details/SharedTripHero";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useSharedTravelPlan } from "../../hooks/sharedTrips/details/useSharedTravelPlan";

export function SharedTripPage() {
  const { token } = useParams();

  const { sharedTrip, loadingSharedTrip, sharedTripError } =
    useSharedTravelPlan(token);

  return (
    <main className="min-h-screen bg-[#eee6dc] px-6 py-6 text-[#2f2924] lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <SharedTripHeader />

        {loadingSharedTrip && (
          <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
            <LoadingState message="Loading shared travel plan..." />
          </section>
        )}

        {!loadingSharedTrip && sharedTripError && (
          <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
            <ErrorBox message={sharedTripError} />
          </section>
        )}

        {!loadingSharedTrip && !sharedTripError && sharedTrip && (
          <>
            <SharedTripHero sharedTrip={sharedTrip} />

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
