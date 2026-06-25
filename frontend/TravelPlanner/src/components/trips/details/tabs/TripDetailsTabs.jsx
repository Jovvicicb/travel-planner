import { useState } from "react";
import { Tabs } from "../../../ui/Tabs";
import { TripOverviewTab } from "./TripOverviewTab";

const TRIP_DETAILS_TABS = [
  {
    id: "overview",
    label: "Overview",
  },
];

export function TripDetailsTabs({ trip }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Tabs
        tabs={TRIP_DETAILS_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <section className="rounded-b-3xl rounded-tr-3xl border border-t-0 border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        {activeTab === "overview" && <TripOverviewTab trip={trip} />}
      </section>
    </>
  );
}
