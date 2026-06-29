import { useMemo, useState } from "react";

import {
  REMINDER_STATUSES,
  REMINDER_STATUS_TABS,
} from "../../../../constants/enums/reminderStatuses";
import { notifyTriggeredReminderCountChanged } from "../../../../events/reminders/triggeredReminderCountEvents";
import { useSuccessMessage } from "../../../../hooks/common/useSuccessMessage";
import { useCompleteReminder } from "../../../../hooks/reminders/complete/useCompleteReminder";
import { useCreateReminder } from "../../../../hooks/reminders/create/useCreateReminder";
import { useDeleteReminder } from "../../../../hooks/reminders/delete/useDeleteReminder";
import { useTripReminders } from "../../../../hooks/reminders/list/useTripReminders";
import { filterRemindersByStatus } from "../../../../mappers/reminders/reminderDisplayMapper";
import { createReminderFormModel } from "../../../../models/reminders/create/createReminderFormModel";
import { validateCreateReminderForm } from "../../../../validation/reminders/create/reminderCreateValidation";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";
import { ReminderForm } from "../../reminders/form/ReminderForm";
import { ReminderList } from "../../reminders/list/ReminderList";
import { ReminderStatusTabs } from "../../reminders/tabs/ReminderStatusTabs";

export function TripRemindersTab({ trip }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [formData, setFormData] = useState(() => createReminderFormModel());
  const [errors, setErrors] = useState({});
  const [reminderToDelete, setReminderToDelete] = useState(null);

  const { successMessage, setSuccessMessage, clearSuccessMessage } =
    useSuccessMessage();

  const { reminders, loadingReminders, remindersError, reloadReminders } =
    useTripReminders(trip.id);

  const { creatingReminder, createReminderError, createReminder } =
    useCreateReminder();

  const { completingReminder, completeReminderError, completeReminder } =
    useCompleteReminder();

  const { deletingReminder, deleteReminderError, deleteReminder } =
    useDeleteReminder();

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

  const activeLabel =
    REMINDER_STATUS_TABS.find((tab) => tab.id === activeTab)?.label ||
    "Reminders";

  const visibleReminders = useMemo(() => {
    if (activeStatus === undefined) {
      return [];
    }

    return filterRemindersByStatus(reminders, activeStatus);
  }, [reminders, activeStatus]);

  const hasVisibleReminders = visibleReminders.length > 0;

  function resetForm() {
    setFormData(createReminderFormModel());
    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    clearSuccessMessage();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateReminderForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdReminder = await createReminder(trip.id, formData);

    if (!createdReminder) {
      return;
    }

    resetForm();
    setActiveTab("upcoming");
    setSuccessMessage("Reminder created successfully.");

    await reloadReminders();
  }

  function handleCancel() {
    resetForm();
    clearSuccessMessage();
  }

  async function handleCompleteReminder(reminder) {
    const completedReminder = await completeReminder(reminder.id);

    if (!completedReminder) {
      return;
    }

    notifyTriggeredReminderCountChanged(-1);

    setActiveTab("completed");
    setSuccessMessage("Reminder completed successfully.");

    await reloadReminders();
  }

  function handleOpenDeleteDialog(reminder) {
    setReminderToDelete(reminder);
    clearSuccessMessage();
  }

  function handleCancelDelete() {
    setReminderToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!reminderToDelete) {
      return;
    }

    const deletedReminder = await deleteReminder(reminderToDelete.id);

    if (!deletedReminder) {
      return;
    }

    if (reminderToDelete.status === REMINDER_STATUSES.TRIGGERED) {
      notifyTriggeredReminderCountChanged(-1);
    }

    setReminderToDelete(null);
    setSuccessMessage("Reminder deleted successfully.");

    await reloadReminders();
  }

  return (
    <>
      <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        <SectionHeader
          title="Reminders"
          description="Create and review reminders connected to this travel plan."
        />

        {successMessage && (
          <div className="mb-5">
            <SuccessBox message={successMessage} />
          </div>
        )}

        {createReminderError && (
          <div className="mb-5">
            <ErrorBox message={createReminderError} />
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

        <ReminderForm
          formData={formData}
          errors={errors}
          submitting={creatingReminder}
          submitLabel="Create reminder"
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
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

              {!hasVisibleReminders && (
                <EmptyState
                  title={`No ${activeLabel.toLowerCase()} reminders`}
                  description="Reminders for this status will appear here."
                />
              )}

              {hasVisibleReminders && (
                <ReminderList
                  reminders={visibleReminders}
                  completing={completingReminder}
                  deleting={deletingReminder}
                  onComplete={handleCompleteReminder}
                  onDelete={handleOpenDeleteDialog}
                />
              )}
            </div>
          )}
        </div>
      </div>

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
