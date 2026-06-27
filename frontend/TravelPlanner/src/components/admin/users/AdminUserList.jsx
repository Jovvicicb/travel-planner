import { AdminUserCard } from "./AdminUserCard";

export function AdminUserList({ users }) {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <AdminUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
