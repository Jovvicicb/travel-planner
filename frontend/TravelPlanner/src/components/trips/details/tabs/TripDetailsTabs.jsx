import { useSearchParams } from "react-router-dom";

import { Tabs } from "../../../ui/Tabs";
import { TripActivitiesTab } from "./TripActivitiesTab";
import { TripChecklistTab } from "./TripChecklistTab";
import { TripDestinationsTab } from "./TripDestinationsTab";
import { TripExpensesTab } from "./TripExpensesTab";
import { TripOverviewTab } from "./TripOverviewTab";
import { TripRemindersTab } from "./TripRemindersTab";
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
  {
    id: "reminders",
    label: "Reminders",
  },
];

const DEFAULT_TAB = "overview";

function getValidTab(tabId) {
  const tabExists = TRIP_DETAILS_TABS.some((tab) => tab.id === tabId);

  return tabExists ? tabId : DEFAULT_TAB;
}

export function TripDetailsTabs({ trip }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = getValidTab(searchParams.get("tab"));

  function handleTabChange(tabId) {
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

        {activeTab === "reminders" && <TripRemindersTab trip={trip} />}
      </section>
    </>
  );
}
