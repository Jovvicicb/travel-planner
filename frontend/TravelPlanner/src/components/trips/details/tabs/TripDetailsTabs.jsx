import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "../../../ui/Tabs";
import { TripActivitiesTab } from "./TripActivitiesTab";
import { TripChecklistTab } from "./TripChecklistTab";
import { TripDestinationsTab } from "./TripDestinationsTab";
import { TripExpensesTab } from "./TripExpensesTab";
import { TripOverviewTab } from "./TripOverviewTab";
import { TripSharesTab } from "./TripSharesTab";

const TRIP_DETAILS_TABS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "destinations",
    label: "Destinations",
  },
  {
    id: "activities",
    label: "Activities",
  },
  {
    id: "expenses",
    label: "Expenses",
  },
  {
    id: "checklist",
    label: "Checklist",
  },
  {
    id: "shares",
    label: "Sharing",
  },
];

export function TripDetailsTabs({ trip }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  }

  return (
    <>
      <Tabs
        tabs={TRIP_DETAILS_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <section className="rounded-b-3xl rounded-tr-3xl border border-t-0 border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        {activeTab === "overview" && <TripOverviewTab trip={trip} />}

        {activeTab === "destinations" && <TripDestinationsTab trip={trip} />}

        {activeTab === "activities" && <TripActivitiesTab trip={trip} />}

        {activeTab === "expenses" && <TripExpensesTab trip={trip} />}

        {activeTab === "checklist" && <TripChecklistTab trip={trip} />}

        {activeTab === "shares" && <TripSharesTab trip={trip} />}
      </section>
    </>
  );
}
