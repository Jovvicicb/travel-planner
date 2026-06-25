import { DestinationCard } from "./DestinationCard";

export function DestinationList({ destinations, onDelete }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
