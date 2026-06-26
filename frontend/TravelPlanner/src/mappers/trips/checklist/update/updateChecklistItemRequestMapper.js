export function toUpdateChecklistItemRequest(data) {
  return {
    title: data.title.trim(),
    isCompleted: Boolean(data.isCompleted),
  };
}
