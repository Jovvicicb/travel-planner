import { useEffect, useState } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { ReminderList } from "../../components/trips/reminders/list/ReminderList";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { SuccessBox } from "../../components/ui/SuccessBox";
import { useCompleteReminder } from "../../hooks/reminders/complete/useCompleteReminder";
import { useDeleteReminder } from "../../hooks/reminders/delete/useDeleteReminder";
import { useTriggeredReminders } from "../../hooks/reminders/list/useTriggeredReminders";
import { notifyTriggeredReminderCountChanged } from "../../events/reminders/triggeredReminderCountEvents";

export function RemindersPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [reminderToDelete, setReminderToDelete] = useState(null);

  const { reminders, loadingReminders, remindersError, reloadReminders } =
    useTriggeredReminders();

  const { completingReminder, completeReminderError, completeReminder } =
    useCompleteReminder();

  const { deletingReminder, deleteReminderError, deleteReminder } =
    useDeleteReminder();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

  async function handleCompleteReminder(reminder) {
    await completeReminder(reminder.id);

    notifyTriggeredReminderCountChanged(-1);

    setSuccessMessage("Reminder completed successfully.");

    await reloadReminders();
  }

  function handleOpenDeleteDialog(reminder) {
    setReminderToDelete(reminder);
    setSuccessMessage("");
  }

  function handleCancelDelete() {
    setReminderToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!reminderToDelete) {
      return;
    }

    await deleteReminder(reminderToDelete.id);

    notifyTriggeredReminderCountChanged(-1);

    setReminderToDelete(null);
    setSuccessMessage("Reminder deleted successfully.");

    await reloadReminders();
  }

  return (
    <>
      <AppHeader
        title="Reminders"
        description="Review triggered reminders from your travel plans."
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          <SectionHeader
            title="Triggered reminders"
            description="These reminders are ready for your attention."
          />

          {successMessage && (
            <div className="mb-5">
              <SuccessBox message={successMessage} />
            </div>
          )}

          {completeReminderError && (
            <div className="mb-5">
              <ErrorBox message={completeReminderError} />
            </div>
          )}

          {deleteReminderError && (
            <div className="mb-5">
              <ErrorBox message={deleteReminderError} />
            </div>
          )}

          {loadingReminders && (
            <LoadingState message="Loading triggered reminders..." />
          )}

          {!loadingReminders && remindersError && (
            <ErrorBox message={remindersError} />
          )}

          {!loadingReminders && !remindersError && reminders.length === 0 && (
            <EmptyState
              title="No triggered reminders"
              description="Triggered reminders will appear here when their scheduled time arrives."
            />
          )}

          {!loadingReminders && !remindersError && reminders.length > 0 && (
            <ReminderList
              reminders={reminders}
              completing={completingReminder}
              deleting={deletingReminder}
              onComplete={handleCompleteReminder}
              onDelete={handleOpenDeleteDialog}
            />
          )}
        </section>
      </main>

      <ConfirmDialog
        open={Boolean(reminderToDelete)}
        title="Delete reminder?"
        description={
          reminderToDelete
            ? `This will permanently delete "${reminderToDelete.title}".`
            : ""
        }
        confirmLabel="Delete reminder"
        cancelLabel="Cancel"
        confirming={deletingReminder}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
