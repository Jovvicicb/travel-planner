import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateReminder } from "../../../../hooks/reminders/update/useUpdateReminder";
import { toUpdateReminderFormModel } from "../../../../mappers/reminders/update/updateReminderFormMapper";
import { validateUpdateReminderForm } from "../../../../validation/reminders/update/reminderUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { ReminderForm } from "../form/ReminderForm";

export function EditReminderFormContent({ tripId, reminder }) {
  const navigate = useNavigate();

  const { updatingReminder, updateReminderError, updateReminder } =
    useUpdateReminder();

  const [formData, setFormData] = useState(() =>
    toUpdateReminderFormModel(reminder),
  );

  const [errors, setErrors] = useState({});

  const remindersPath = `/trips/${tripId}?tab=reminders`;

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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateUpdateReminderForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const updatedReminder = await updateReminder(reminder.id, formData);

    if (!updatedReminder) {
      return;
    }

    navigate(remindersPath);
  }

  function handleCancel() {
    navigate(remindersPath);
  }

  return (
    <>
      <SectionHeader
        title="Reminder details"
        description="Editing a reminder schedules it again as an upcoming reminder."
      />

      {updateReminderError && (
        <div className="mb-5">
          <ErrorBox message={updateReminderError} />
        </div>
      )}

      <ReminderForm
        formData={formData}
        errors={errors}
        submitting={updatingReminder}
        submitLabel="Save reminder"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
