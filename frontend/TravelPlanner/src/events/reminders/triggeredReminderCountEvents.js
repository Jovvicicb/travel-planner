export const TRIGGERED_REMINDER_COUNT_CHANGED_EVENT =
  "triggered-reminder-count-changed";

export function notifyTriggeredReminderCountChanged(delta = 0) {
  window.dispatchEvent(
    new CustomEvent(TRIGGERED_REMINDER_COUNT_CHANGED_EVENT, {
      detail: { delta },
    }),
  );
}
