import { ReminderCard } from "./ReminderCard";

export function ReminderList({
  reminders,
  completing,
  deleting,
  onComplete,
  onDelete,
}) {
  return (
    <div className="grid gap-4">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          completing={completing}
          deleting={deleting}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
