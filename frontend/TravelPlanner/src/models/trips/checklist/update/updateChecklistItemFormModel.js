export function createUpdateChecklistItemFormModel(item) {
  return {
    title: item.title || "",
    isCompleted: Boolean(item.isCompleted),
  };
}
