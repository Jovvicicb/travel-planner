import { ChecklistItemCard } from "./ChecklistItemCard";

export function ChecklistItemList({ items, tripId }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <ChecklistItemCard key={item.id} item={item} tripId={tripId} />
      ))}
    </div>
  );
}
