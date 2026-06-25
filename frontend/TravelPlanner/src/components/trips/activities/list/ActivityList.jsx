import { ActivityCard } from "./ActivityCard";

export function ActivityList({ activities }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
