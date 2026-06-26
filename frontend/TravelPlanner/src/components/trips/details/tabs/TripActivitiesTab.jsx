import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActivityCalendar } from "../../../../hooks/trips/activities/calendar/useActivityCalendar";
import { useActivities } from "../../../../hooks/trips/activities/list/useActivities";
import { useDestinations } from "../../../../hooks/trips/destinations/list/useDestinations";
import { toDestinationListItemDisplayModel } from "../../../../mappers/trips/destinations/list/destinationListItemDisplayMapper";
import { ActivityCalendarMonthView } from "../../activities/calendar/ActivityCalendarMonthView";
import { ActivityList } from "../../activities/list/ActivityList";
import { ActivityTabSwitcher } from "../../activities/tabs/ActivityTabSwitcher";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";

export function TripActivitiesTab({ trip }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialDestinationId = searchParams.get("destinationId") || "";
  const initialView = searchParams.get("activityView") || "list";

  const [selectedDestinationId, setSelectedDestinationId] =
    useState(initialDestinationId);
  const [activeActivityView, setActiveActivityView] = useState(initialView);

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(trip.id);

  const { activities, loadingActivities, activitiesError } = useActivities(
    trip.id,
    selectedDestinationId,
  );

  const { calendarDays, loadingActivityCalendar, activityCalendarError } =
    useActivityCalendar(trip.id);

  const selectedDestination = destinations.find(
    (destination) => destination.id === Number(selectedDestinationId),
  );

  function updateActivityUrl(view, destinationId = selectedDestinationId) {
    const nextParams = {
      tab: "activities",
      activityView: view,
    };

    if (destinationId) {
      nextParams.destinationId = destinationId;
    }

    setSearchParams(nextParams);
  }

  function handleActivityViewChange(view) {
    setActiveActivityView(view);
    updateActivityUrl(view);
  }

  function handleDestinationChange(event) {
    const destinationId = event.target.value;

    setSelectedDestinationId(destinationId);
    updateActivityUrl("list", destinationId);
  }

  function handleCalendarActivitySelect(activity) {
    const destinationId = String(activity.destinationId);

    setSelectedDestinationId(destinationId);
    setActiveActivityView("list");
    updateActivityUrl("list", destinationId);
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Activities"
        description="Review activities by destination or use the calendar view to browse the travel plan day by day."
      />

      <ActivityTabSwitcher
        activeView={activeActivityView}
        onChange={handleActivityViewChange}
      />

      {destinationsError && (
        <div className="mb-5">
          <ErrorBox message={destinationsError} />
        </div>
      )}

      {loadingDestinations && (
        <LoadingState message="Loading destinations..." />
      )}

      {!loadingDestinations &&
        destinations.length === 0 &&
        !destinationsError && (
          <EmptyState
            title="No destinations available"
            description="Add a destination first before reviewing activities."
          />
        )}

      {!loadingDestinations &&
        destinations.length > 0 &&
        activeActivityView === "list" && (
          <>
            <section className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
              <div className="mb-3 border-b border-[#d6c8b8] pb-3">
                <h3 className="text-sm font-black text-[#2f2924]">
                  Activities by destination
                </h3>

                <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
                  Select a destination to load activities planned for that
                  place.
                </p>
              </div>

              <div>
                <label className="text-xs font-black text-[#2f2924]">
                  Destination
                </label>

                <select
                  value={selectedDestinationId}
                  onChange={handleDestinationChange}
                  className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
                >
                  <option value="">Select destination</option>

                  {destinations.map((destination) => {
                    const displayDestination =
                      toDestinationListItemDisplayModel(destination);

                    return (
                      <option key={destination.id} value={destination.id}>
                        {displayDestination.selectLabel}
                      </option>
                    );
                  })}
                </select>
              </div>
            </section>

            <section className="mt-6 border-t-2 border-[#b8a692] pt-5">
              <SectionHeader
                title={
                  selectedDestination
                    ? `Activities for ${selectedDestination.name}`
                    : "Activity list"
                }
                description={
                  selectedDestination
                    ? "Review activities planned for the selected destination."
                    : "Choose a destination to display its activities."
                }
              />

              {!selectedDestinationId && (
                <EmptyState
                  title="Select a destination"
                  description="Choose a destination above to load its activities, or select an activity from the calendar view."
                />
              )}

              {selectedDestinationId && loadingActivities && (
                <LoadingState message="Loading activities..." />
              )}

              {selectedDestinationId &&
                !loadingActivities &&
                activitiesError && <ErrorBox message={activitiesError} />}

              {selectedDestinationId &&
                !loadingActivities &&
                !activitiesError &&
                activities.length === 0 && (
                  <EmptyState
                    title="No activities yet"
                    description="This destination does not have any planned activities yet."
                  />
                )}

              {selectedDestinationId &&
                !loadingActivities &&
                !activitiesError &&
                activities.length > 0 && (
                  <ActivityList activities={activities} tripId={trip.id} />
                )}
            </section>
          </>
        )}

      {!loadingDestinations &&
        destinations.length > 0 &&
        activeActivityView === "calendar" && (
          <section>
            <SectionHeader
              title="Calendar view"
              description="Activities grouped by date across the entire travel plan."
            />

            {loadingActivityCalendar && (
              <LoadingState message="Loading activity calendar..." />
            )}

            {!loadingActivityCalendar && activityCalendarError && (
              <ErrorBox message={activityCalendarError} />
            )}

            {!loadingActivityCalendar &&
              !activityCalendarError &&
              calendarDays.length === 0 && (
                <EmptyState
                  title="No activities in calendar"
                  description="Create activities for destinations to build the day-by-day travel calendar."
                />
              )}

            {!loadingActivityCalendar &&
              !activityCalendarError &&
              calendarDays.length > 0 && (
                <ActivityCalendarMonthView
                  trip={trip}
                  destinations={destinations}
                  calendarDays={calendarDays}
                  onSelectActivity={handleCalendarActivitySelect}
                />
              )}
          </section>
        )}
    </div>
  );
}
