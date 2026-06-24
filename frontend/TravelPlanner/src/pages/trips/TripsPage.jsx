import { useState } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { TravelPlansTab } from "../../components/trips/list/TravelPlansTab";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { Tabs } from "../../components/ui/Tabs";
import { useTrips } from "../../hooks/trips/list/useTrips";

const TRIPS_TABS = [
  {
    id: "plans",
    label: "Plans",
  },
];

export function TripsPage() {
  const [activeTab, setActiveTab] = useState("plans");
  const { trips, loadingTrips, tripsError } = useTrips();

  return (
    <>
      <AppHeader
        title="Travel plans"
        description="Create, organize and manage all your upcoming trips in one place."
        action={<ButtonLink to="/trips/create">Create travel plan</ButtonLink>}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <Tabs tabs={TRIPS_TABS} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "plans" && (
          <TravelPlansTab
            trips={trips}
            loadingTrips={loadingTrips}
            tripsError={tripsError}
          />
        )}
      </main>
    </>
  );
}
