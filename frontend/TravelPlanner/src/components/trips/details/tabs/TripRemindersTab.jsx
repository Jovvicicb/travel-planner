import { useMemo, useState } from "react";
import {
  REMINDER_STATUSES,
  REMINDER_STATUS_TABS,
} from "../../../../constants/enums/reminderStatuses";
import { useCreateReminder } from "../../../../hooks/reminders/create/useCreateReminder";
import { useTripReminders } from "../../../../hooks/reminders/list/useTripReminders";
import { filterRemindersByStatus } from "../../../../mappers/reminders/reminderDisplayMapper";
import { createReminderFormModel } from "../../../../models/reminders/create/createReminderFormModel";
import { validateCreateReminderForm } from "../../../../validation/reminders/create/reminderCreateValidation";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";
import { CreateReminderForm } from "../../reminders/create/CreateReminderForm";
import { ReminderList } from "../../reminders/list/ReminderList";
import { ReminderStatusTabs } from "../../reminders/tabs/ReminderStatusTabs";

export function TripRemindersTab({ trip }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [formData, setFormData] = useState(() => createReminderFormModel());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { reminders, loadingReminders, remindersError, reloadReminders } =
    useTripReminders(trip.id);

  const { creatingReminder, createReminderError, createReminder } =
    useCreateReminder();

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

    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateReminderForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await createReminder(trip.id, formData);

    setFormData(createReminderFormModel());
    setErrors({});
    setActiveTab("upcoming");
    setSuccessMessage("Reminder created successfully.");

    await reloadReminders();
  }

  function handleCancel() {
    setFormData(createReminderFormModel());
    setErrors({});
    setSuccessMessage("");
  }

  return (
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

      <CreateReminderForm
        formData={formData}
        errors={errors}
        submitting={creatingReminder}
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
    </div>
  );
}
