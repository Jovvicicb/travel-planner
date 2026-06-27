import { ReminderCard } from "./ReminderCard";

export function ReminderList({ reminders }) {
  return (
    <div className="grid gap-4">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
}
