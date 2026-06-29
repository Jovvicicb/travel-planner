import { AppHeader } from "../../components/layout/AppHeader";
import { TravelPlansSection } from "../../components/trips/list/TravelPlansSection";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { useTrips } from "../../hooks/trips/list/useTrips";

export function TripsPage() {
  const { trips, loadingTrips, tripsError } = useTrips();

  return (
    <>
      <AppHeader
        title="Travel plans"
        description="Create, organize and manage all your upcoming trips in one place."
        action={<ButtonLink to="/trips/create">Create travel plan</ButtonLink>}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <TravelPlansSection
          trips={trips}
          loadingTrips={loadingTrips}
          tripsError={tripsError}
        />
      </main>
    </>
  );
}
