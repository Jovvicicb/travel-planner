import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateReminder } from "../../../../hooks/reminders/update/useUpdateReminder";
import { toUpdateReminderFormModel } from "../../../../mappers/reminders/update/updateReminderFormMapper";
import { validateUpdateReminderForm } from "../../../../validation/reminders/update/reminderUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { UpdateReminderForm } from "./UpdateReminderForm";

export function EditReminderFormContent({ tripId, reminder }) {
  const navigate = useNavigate();

  const { updatingReminder, updateReminderError, updateReminder } =
    useUpdateReminder();

  const [formData, setFormData] = useState(() =>
    toUpdateReminderFormModel(reminder),
  );

  const [errors, setErrors] = useState({});

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

    await updateReminder(reminder.id, formData);

    navigate(`/trips/${tripId}?tab=reminders`);
  }

  function handleCancel() {
    navigate(`/trips/${tripId}?tab=reminders`);
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

      <UpdateReminderForm
        formData={formData}
        errors={errors}
        submitting={updatingReminder}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
