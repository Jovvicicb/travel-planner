import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditReminderFormContent } from "../../components/trips/reminders/update/EditReminderFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useReminderDetails } from "../../hooks/reminders/details/useReminderDetails";

export function EditReminderPage() {
  const { tripId, reminderId } = useParams();

  const { reminder, loadingReminder, reminderError } =
    useReminderDetails(reminderId);

  const remindersPath = `/trips/${tripId}?tab=reminders`;

  return (
    <>
      <AppHeader
        title="Edit reminder"
        description="Update reminder details and schedule a new future local date and time."
        backTo={remindersPath}
        backLabel="Back to reminders"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loadingReminder && <LoadingState message="Loading reminder..." />}

          {!loadingReminder && reminderError && (
            <ErrorBox message={reminderError} />
          )}

          {!loadingReminder && !reminderError && !reminder && (
            <ErrorBox message="Reminder not found." />
          )}

          {!loadingReminder && !reminderError && reminder && (
            <EditReminderFormContent
              key={reminder.id}
              tripId={tripId}
              reminder={reminder}
            />
          )}
        </section>
      </main>
    </>
  );
}
