import { useMemo, useState } from "react";
import {
  REMINDER_STATUSES,
  REMINDER_STATUS_TABS,
} from "../../../../constants/enums/reminderStatuses";
import { useTripReminders } from "../../../../hooks/reminders/list/useTripReminders";
import { filterRemindersByStatus } from "../../../../mappers/reminders/reminderDisplayMapper";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { ReminderList } from "../../reminders/list/ReminderList";
import { ReminderStatusTabs } from "../../reminders/tabs/ReminderStatusTabs";

export function TripRemindersTab({ trip }) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const { reminders, loadingReminders, remindersError } = useTripReminders(
    trip.id,
  );

  const counts = useMemo(
    () => ({
      upcoming: filterRemindersByStatus(reminders, REMINDER_STATUSES.PENDING)
        .length,
      triggered: filterRemindersByStatus(reminders, REMINDER_STATUSES.TRIGGERED)
        .length,
      completed: filterRemindersByStatus(reminders, REMINDER_STATUSES.COMPLETED)
        .length,
    }),
    [reminders],
  );

  const activeStatus = REMINDER_STATUS_TABS.find(
    (tab) => tab.id === activeTab,
  )?.status;

  const visibleReminders = useMemo(() => {
    if (activeStatus === undefined) {
      return [];
    }

    return filterRemindersByStatus(reminders, activeStatus);
  }, [reminders, activeStatus]);

  const activeLabel =
    REMINDER_STATUS_TABS.find((tab) => tab.id === activeTab)?.label ||
    "Reminders";

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Reminders"
        description="Review reminders connected to this travel plan."
      />

      {loadingReminders && <LoadingState message="Loading reminders..." />}

      {!loadingReminders && remindersError && (
        <ErrorBox message={remindersError} />
      )}

      {!loadingReminders && !remindersError && (
        <div className="grid gap-5">
          <ReminderStatusTabs
            activeTab={activeTab}
            counts={counts}
            onChange={setActiveTab}
          />

          {visibleReminders.length === 0 && (
            <EmptyState
              title={`No ${activeLabel.toLowerCase()} reminders`}
              description="Reminders for this status will appear here."
            />
          )}

          {visibleReminders.length > 0 && (
            <ReminderList reminders={visibleReminders} />
          )}
        </div>
      )}
    </div>
  );
}
