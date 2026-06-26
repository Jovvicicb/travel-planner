import { ChecklistItemCard } from "./ChecklistItemCard";

export function ChecklistItemList({
  items,
  tripId,
  toggling,
  onToggle,
  onDelete,
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <ChecklistItemCard
          key={item.id}
          item={item}
          tripId={tripId}
          toggling={toggling}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
