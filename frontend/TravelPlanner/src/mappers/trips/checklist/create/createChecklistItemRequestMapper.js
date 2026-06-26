export function toCreateChecklistItemRequest(data) {
  return {
    title: data.title.trim(),
  };
}
