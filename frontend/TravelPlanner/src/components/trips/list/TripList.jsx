import { TripCard } from "./TripCard";

export function TripList({ trips }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
